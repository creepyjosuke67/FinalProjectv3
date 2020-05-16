import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {lfmKey, discogKey, discogSecret} from '../components/Constants.js';
import {db} from '../config'
import { isConfigurationAvailable } from 'expo/build/AR';
export default class lfmAlbums extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          username:'cwater16',
          lfm_key: lfmKey,
          data: [],
          discogSearch:'',
          isLoading: true
        };
    }

    masterSearch(item) {
        this.setState({discogSearch:item});
        this.setState({discogSearch:discogSearch.replace(" ","%20")});
        this.props.navigation.navigate('FinalScreen.js',{
          newSearch: this.state.discogSearch
        });
    }

    componentDidMount() {

        db.ref('UsersList')
        
        fetch('http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user='+this.state.username+'&api_key='+this.state.lfm_key+'&format=json',{
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