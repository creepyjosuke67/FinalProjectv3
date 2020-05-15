import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {lfmKey, discogKey, discogSecret} from '../components/Constants.js';
export default class lfmAlbums extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          username:,
          lfm_key: lfmKey,
          discogKey:discogKey,
          discogSecret:discogSecret,
          data: [],
          discogSearch:'mask',
          discogData:[],
          vibeCheck: '',
          isLoading: true
        };
    }

    pullDiscogs(item) {
        this.setState({discogSearch: this.item});
        this.setState({isLoading: true});
        fetch('https://api.discogs.com/database/search?q='+this.state.discogSearch+'&key='+this.state.discogKey+'&secret='+this.state.discogSecret,{
            method:'GET',
        })
        .then((response) => response.json())
        .then((json) => {
            this.setState({data: json.results});
        })
        .catch((error) => console.error(error))
        .finally(() => {
            this.setState({isLoading: false});
        })
        this.setState({vibeCheck:this.state.data[0].master_id})
        //this.props.navigation.navigate('FinalScreen',{masterID: discogData.master_id});
    }

    componentDidMount() {
        
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
                            onPress={() => this.pullDiscogs(item.name)}
                        />
                        
                  </View>
                  
                )}
              />
            )}
          </View>
        );
    }

}