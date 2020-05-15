import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, Button, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import {app} from '../config';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            password: '',
            errorMessage: null
        };
    }
    onPressRegister(test) {
        firebase.auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(() => this.props.navigation.navigate('NewUser',{email: this.state.email}))
        .catch((error)=>{console.log('error',error)})
    }
    onPressLogin(test) {
        firebase.auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('List',{email: this.state.email}))
        .catch((error)=>{console.log('error',error)})
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Email Address'
                    onChangeText={text => this.setState({email:text})}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    password={true}
                    onChangeText={text => this.setState({password:text})}
                    value={this.state.password}
                />
                <Button
                    title="Register"
                    style={styles.Button}
                    onPress={this.onPressRegister.bind(this)}
                />
                <Button
                    title="Login"
                    style={styles.Button}
                    onPress={this.onPressLogin.bind(this)}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center'
    },
    input:{
        color: 'black',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
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
})