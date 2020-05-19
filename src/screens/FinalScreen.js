import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {lfmKey, discogKey, discogSecret} from '../components/Constants.js';
export default class lfmAlbums extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          discogKey: discogKey,
          discogSecret: discogSecret,
          username: 'cwater16',
          data: [],
          discogMaster:'2463',
          vibeCheck: '',
          isLoading: true
        };
    }
    componentDidMount() {
        const newSearch = this.props.navigation.getParam('newSearch','NO-ID');
        const newArtist = this.props.navigation.getParam('newArtist','NO-ID');
        console.log(newArtist);
        fetch('https://api.discogs.com/database/search?q='+newSearch+'%20'+newArtist+'&type=release'+'&key='+this.state.discogKey+'&secret='+this.state.discogSecret,{
        
            method:'GET',
          
        })
        .then((response) => response.json())
        .then((json) => {
            this.setState({ data: json.results });
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
                        
                        <Text style={{color:'white', paddingBottom:5}}>{item.title}</Text>
                    
                        <Text style={{color:'white', paddingBottom:5}}>{item.format[0]} {item.format[1]} {item.format[2]} {item.format[3]}</Text>

                <Text style={{color:'white',paddingBottom:5}}>{item.country} {item.year}</Text>

                        <Image source={{uri:item.cover_image}} style ={{height:300, width:300}}/>
      
                  </View>
                  
                )}
              />
            )}
          </View>
        );
    }

}