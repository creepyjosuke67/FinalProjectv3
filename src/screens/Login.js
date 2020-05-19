import React, { Component } from 'react';
import { KeyboardAvoidingView,View, Text, TextInput, TouchableHighlight, Button, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import {app} from '../config';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            password: '',
            errorMessage: null,
            lfmUsername: ''
        };
    }
    onPressRegister(test) {
        firebase.auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(() => this.props.navigation.navigate('Registration',{email: this.state.email}))
        .catch((error)=>{console.log('error',error)})
    }
    onPressLogin(test) {
        firebase.auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('TopAlbums',{email: this.state.email}))
        .catch((error)=>{console.log('error',error)})
    }
    render() {
        return (
            
            
            
            <KeyboardAvoidingView style={styles.main}>
                <Text style={styles.title}>Album Saver</Text>
                
                <TextInput
                    style={styles.itemInput}
                    placeholder='Email Address'
                    onChangeText={text => this.setState({email:text})}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.itemInput}
                    placeholder='Password'
                    password={true}
                    onChangeText={text => this.setState({password:text})}
                    value={this.state.password}
                />
                <Button
                    title="Register"
                    style={styles.button}
                    onPress={this.onPressRegister.bind(this)}
                />
                <Button
                    title="Login"
                    style={styles.button}
                    onPress={this.onPressLogin.bind(this)}
                />
            </KeyboardAvoidingView>
            
        );
    }
}
const styles = StyleSheet.create({
    main: {
      flex: 1,
      padding: 30,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'black'
    },
    title: {
        color:'white',
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
      color: 'black',
      alignSelf: 'center'
    },
    button: {
      color:'white',
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