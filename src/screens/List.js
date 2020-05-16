import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {lfmKey, discogKey, discogSecret} from '../components/Constants.js';
import {db} from '../config';
import * as firebase from 'firebase';
import { isConfigurationAvailable } from 'expo/build/AR';
export default class lfmAlbums extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          username:'',
          lfm_key: lfmKey,
          userID: '',
          data: [],
          discogSearch:'',
          isLoading: true
        };
    }

    masterSearch(item) {
        var searchTerm = ({discogSearch:item});
        this.setState({discogSearch:this.state.discogSearch.replace(" ","%20")});
        this.props.navigation.navigate('FinalScreen',{
          newSearch: this.state.discogSearch
        });
    }

    componentDidMount() {
        //Trying to figure out how to pull the lfmusername from the database for the email of the user that is logged in
        const userID = (firebase.auth().currentUser.uid);
        var username = '';
        let userRef = db.ref('users/'+ userID).child('lfmUser');
        userRef.on('value',(snap) =>{
          console.log(snap.val());
          username=snap.val();
          
        });

        fetch('http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user='+username+'&api_key='+this.state.lfm_key+'&format=json',{
            method:'GET',
          
        })
        .then((response) => response.json())
        .then((json) => {
            this.setState({ data: json.topalbums.album });
        })
        .catch((error) => console.error(error))
        .finally(() => {
            this.setState({ isLoading: false });
        });
    }
    
    render() {
        const { data, isLoading } = this.state;
    
        return (
          <View style={{ flex: 1, padding: 24, backgroundColor:'black' }}>
          <Text style={{color:'white', textAlign:'center', fontSize:24, paddingBottom:10, fontWeight:'bold'}}> AlbumSaver</Text>
          
            {isLoading ? <ActivityIndicator/> : (
              <FlatList
                data={data}
                keyExtractor={({ value }, index) => value}
                renderItem={({ item }) => (
                  <View style={{flex:1,justifyContent:'center',backgroundColor:'black', borderColor:'gray', borderWidth:1, paddingBottom:10, textAlign:'center', margin:10}}>
                        
                        <Text style={{color:'white', paddingBottom:5}}>{item.artist.name}</Text>
                    
                        <Text style={{color:'white'}}> {item.name}</Text>

                        <Image source={{uri:item.image[2]['#text']}} style ={{height:300, width:300}}/>

                        <Button title="find on discogs" 
                            onPress={() => this.masterSearch(item.name)}
                        />
                        
                  </View>
                  
                )}
              />
            )}
          </View>
        );
    }

}