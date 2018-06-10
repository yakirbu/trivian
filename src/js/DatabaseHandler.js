import firebase from "react-native-firebase";
import axios from 'axios';
import { Dimensions } from 'react-native';


var masterdb = firebase.database();
var database1;// = fapp.database("https://12questions-db1.firebaseio.com/");
var database2;// = fapp.database("https://12questions-db2.firebaseio.com/");
var database3;// = fapp.database("https://12questions-db3.firebaseio.com/");
var databases = [masterdb, database1, database2, database3];
var databasesURL = ["https://questions-59ee6.firebaseio.com", "https://12questions-db1.firebaseio.com", "https://12questions-db2.firebaseio.com", "https://12questions-db3.firebaseio.com"];
var databasesState = [true, false, false, false];
//end firebase init

var auth = firebase.auth();

var listenNodes = [];
var questionListeners = [];
const MAX_USERS_DB = 90000;
var onlineTimes = 0;
var currentTutItem = "";
var that;
class DatabaseHandler {
    selected = 0;
    that = this;


    getRem() {
        let { height, width } = Dimensions.get('window');
        return height > 580 ? 13 : 9;
    }

    getAvailableDatabase(callback) {
        that.getDatabasesLoad(callback);

        /*
        console.log("here? ");
        this.selected = 0;
        that.getDataOnce(["Databases"], (snapshot) => {
            console.log("here2 ");


            var db1 = snapshot.val().db1;
            var db2 = snapshot.val().db2;
            var db3 = snapshot.val().db3;

            if (db1 < MAX_USERS_DB)
                this.selected = 1;
            else if (db2 < MAX_USERS_DB)
                this.selected = 2;
            else
                this.selected = 3;

            for (var i = 1; i < databases.length; i++) {
                if (i !== this.selected)
                    that.checkDBState(i, false);
            }

            that.checkDBState(this.selected, true);
            callback(this.selected);
            console.log("databases-load: " + db1 + " " + db2 + " " + db3);

        });
        */
    }


    //check db status
    checkDBState(pos, state) {
        if (!state && databases[pos] == undefined)
            return;
        else if (state && databases[pos] == undefined)
            databases[pos] = fapp.database(databasesURL[pos]);
        var connectedRef = databases[pos].ref('.info/connected');
        connectedRef.once('value', function (snap) {
            if (snap.val() === true) {
                that.changeDBState(pos, state, true);
            }
            else {
                that.changeDBState(pos, state, false);
            }
        });
    }

    //change db state
    changeDBState(pos, state, serverStatus) {
        //if it's already in that state, return.
        if (serverStatus == state)
            return;

        if (state) {
            databases[pos].goOnline();
            databasesState[pos] = state;
        }
        else {
            databases[pos].goOffline();
            databasesState[pos] = state;
        }

        console.log(databasesState);
    }


    //create a listener for a specific node, avoids double listener to same node
    listen(path, callback, type) {
        if (listenNodes && !listenNodes.find(item => { return item === path })) {
            listenNodes.push(path);
            if (type == 'question') {
                this.detachListeners();
                questionListeners.push(path);
            }
            else if (type == 'questionData')
                questionListeners.push(path);
            databases[this.selected].ref(path).on('value', (snap) => {
                callback(snap);
            });
        }
        else
            console.log("already listening to this node");
    }

    detachListeners() {
        questionListeners.forEach(item => {
            console.log("remove-" + item + "-from listening");
            databases[this.selected].ref(item).off();
            questionListeners = questionListeners.filter(e => e != item);
            listenNodes = listenNodes.filter(e => e != item);
        })
    }

    detachListener(path) {
        if (listenNodes) {
            var item = listenNodes.find(item => { return item === path });
            databases[this.selected].ref(item).off();
            listenNodes = listenNodes.filter(e => e != item);
            console.warn(item);
        }
    }


    //Template for a single request (not a listener)
    //path: array, callback: function()
    getDataOnce(path, callback) {
        return databases[this.selected].ref('/' + path.join("/")).once('value').then(function (snapshot) {
            if (snapshot.numChildren() > 0)
                callback(snapshot);
            else
                callback(null);
        });
    }

    //Template for a single request with equalTo query
    //path: array, where: array, callback: function()
    getDataOnceWhere(path, where, callback) {
        return databases[this.selected].ref('/' + path.join("/")).orderByChild(where[0]).equalTo(where[1]).once('value').then(function (snapshot) {
            if (snapshot.numChildren() > 0) {
                snapshot.forEach(function (childSnapshot) {
                    callback(childSnapshot);
                });
            }
            else
                callback(null);
        });
    }


    updateUserAns(qnum, ans, uid, gid, qid, callback) {

        //update question num
        databases[this.selected].ref('/QuestionData/' + qid).transaction(function (qData) {
            console.log("0choosen!!! " + qid);
            if (qData) {
                console.log("1choosen!!!");
                if (ans == 1) {
                    console.log("2choosen!!!");
                    qData.option1Num++;
                }
                else if (ans == 2) {
                    qData.option2Num++;
                }
                else if (ans == 3) {
                    qData.option3Num++;
                }
            }
            return qData;
        });


        //update user ans
        var userAns = {};
        userAns[qnum] = ans;
        databases[this.selected].ref("/UserAns/" + uid + "/" + gid).update(userAns).then((s) => {
            callback(s);
        })
    }


    updateUserGameStatus(uid, status, callback) {
        console.log("here-3");
        databases[this.selected].ref('/Users/' + uid).update({ gameStatus: status }).then((s) => {
            callback(s);
        })
    }


    addUserOnline(gameId, callback) {
        /*
        databases[0].ref('/Databases/').transaction((snapData) => {
            if (snapData) {
                snapData["db" + this.selected]++;
                //snapData.playingUsers++;
            }
            return snapData;
        }).then(s => {
            callback(s);
        });
        */
        console.log("adding-user-online");
        that.getTime((time) => {
            var ref = databases[this.selected].ref('Connect');
            var gameId = this.selected + "-" + "random";
            var obj = {};
            obj[time] = gameId;
            ref.set(obj);
            callback(true);
        });

    }

    addUserOnlineWrapper(callback) {
        if (onlineTimes > 0)
            return;
        onlineTimes++;
        var diconnectRef = databases[this.selected].ref('Disconnect');
        that.getTime((time) => {
            var gameId = this.selected + "-" + "random";
            var obj = {};
            obj[time] = gameId;
            diconnectRef.onDisconnect().set(obj).then(s => {
                that.addUserOnline(gameId, (s) => {
                    //disconnect from master
                    //that.checkDBState(0, false);
                    callback();
                });
            });
        });
    }


    createNewUser(phone, name, callback) {
        that.getTime(time => {
            var user = {
                name: name,
                money: 0,
                hearts: 1,
                totalWins: 0,
                phone: phone,
                gameStatus: "off",
                deviceId: 'web',
                createdAt: time,
            }

            var updates = {};
            updates['/Users/' + time] = user;
            return databases[this.selected].ref().update(updates).then((s) => {
                callback(true);
            });

        })
    }



    getTime(callback) {
        console.log("getting time now!");
        axios.get('https://us-central1-questions-59ee6.cloudfunctions.net/app/api/time')
            .then(function (response) {
                callback(response.data);
            })
            .catch(function (error) {
                callback(null);
            });
    }




    // REST ==========
    getDatabasesLoad(callback) {
        console.log("getting time now!");
        axios.get('https://questions-59ee6.firebaseio.com/Databases.json')
            .then(function (response) {
                var data = response.data;


                var db1 = data.db1;
                var db2 = data.db2;
                var db3 = data.db3;

                if (db1 < MAX_USERS_DB)
                    this.selected = 1;
                else if (db2 < MAX_USERS_DB)
                    this.selected = 2;
                else
                    this.selected = 3;

                console.log("db: " + db1 + "-" + db2 + "-" + db3);

                that.checkDBState(this.selected, true);


                for (var i = 1; i < databases.length; i++) {
                    if (i !== this.selected)
                        that.checkDBState(i, false);
                }

                callback(this.selected);

            })
            .catch(function (error) {
                console.log(error);
                //callback(null);
            });
    }




}
const databaseHandler = new DatabaseHandler();
export { databaseHandler, auth, databases };