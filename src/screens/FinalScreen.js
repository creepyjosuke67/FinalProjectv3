import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class lfmAlbums extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          username: 'cwater16',
          data: [],
          discogMaster:'2463',
          vibeCheck: '',
          isLoading: true
        };
    }
    componentDidMount() {
        fetch('https://api.discogs.com/masters/'+this.state.discogMaster+'/versions',{
            method:'GET',
          
        })
        .then((response) => response.json())
        .then((json) => {
            this.setState({ data: json.versions });
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
                        
                        <Text style={{color:'white', paddingBottom:5}}>{item.stats.label}</Text>
                    
                        <Text style={{color:'white'}}>{item.stats.format}</Text>

                        <Text style={{color:'white'}}>{item.stats.released}</Text>
      
                  </View>
                  
                )}
              />
            )}
          </View>
        );
    }

}