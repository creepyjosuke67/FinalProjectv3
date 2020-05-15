import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import {db} from '../config';

export default class AddItem extends Component {
    
    state = {
        email:this.props.navigation.getParam('email'),
        fname:'',
        lname:'',
        lfmUser:''
    };


    writeUserData(test){
        const email = this.props.navigation.getParam('email','NO-ID');
        const fname = this.state.fname;
        const lname = this.state.lname;
        const lfmUser = this.state.lfmUser;
        db.ref('UsersList').push({
            email,
            fname,
            lname,
            lfmUser
        }).then((data) =>{
            console.log('data', data)
        })
        .then(() => {this.props.navigation.navigate("List")})
        .catch((error =>{
            console.log('error', error)
        }));
    }
    render() {
        return (
            <View style={styles.main}>
                <Text style={styles.title}>Add User Data</Text>
                <TextInput style={styles.itemInput} placeholder='First Name' onChangeText={text => this.setState({fname:text})}/>
                <TextInput style={styles.itemInput} placeholder='Last Name' onChangeText={text => this.setState({lname:text})}/>
                <TextInput style={styles.itemInput} placeholder='Last FM Username' onChangeText={text => this.setState({lname:text})}/>
                <Button
                    title="Add Details"
                    style={styles.button}
                    onPress={this.writeUserData.bind(this)}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    main: {
      flex: 1,
      padding: 30,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#6565fc'
    },
    title: {
      marginBottom: 20,
      fontSize: 25,
      textAlign: 'center'
    },
    itemInput: {
      height: 50,
      padding: 4,
      marginRight: 5,
      fontSize: 23,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 8,
      color: 'white'
    },
    buttonText: {
      fontSize: 18,
      color: '#111',
      alignSelf: 'center'
    },
    button: {
      height: 45,
      flexDirection: 'row',
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }
  });