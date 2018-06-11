import React from 'react';
import { StyleSheet,View} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { databaseHandler } from './DatabaseHandler';


var that;
class HighScore extends React.Component {

    constructor(props) {
        super(props);
        that = this;
        this.state = {
            tableHead: ['Name', 'Score'],
            tableData: [
                []
            ]
        }
    }

    componentDidMount() {
        this.getTopUsers();
    }

    getTopUsers() {
        databaseHandler.getSortedDataOnce("Users", "points", (userData) => {
            var myJsonString = JSON.stringify(userData);
      
            var Data = that.state.tableData;
            //Each element in userData array looks like : ({"Name":Score},{"Name":Score},.....)
            for (var element = userData.length - 1; element >= 0; --element)
            {
                for (var name in userData[element])
                {
                    var rowData = [];
                    rowData.push(name);
                    rowData.push(userData[element][name]);
                    Data.push(rowData); 
                }
            }
            that.setState({tableData:Data});
        });
    }

    render() {
        
        const state = this.state;
        return (
        <View style={styles.container}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
            <Rows data={state.tableData} textStyle={styles.text}/>
            </Table>

            <View>
        
           </View>
        </View>
        )
    }
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });


export default HighScore;