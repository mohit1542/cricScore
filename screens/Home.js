import {  useEffect, useState } from 'react';
import { StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  TouchableOpacity ,
  RefreshControl,
  Image, ActivityIndicator,
}
from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import axios from "axios"
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen=()=>{

  const navigation = useNavigation();
  
  const [Loading, setLoading] =useState(false)
  const [LiveMatch, setLiveMatch]= useState()
  const [refresh, setRefresh] = useState(false)

  const fetchScore =async()=>{
    try { 
        await axios({
            method:'GET',
            url : 'https://cricket-live-scores4.p.rapidapi.com/api/matches/current',
            headers: {
                'X-RapidAPI-Key': '9562757db2msh7ecf5eada7581f2p1175b8jsn7788dbf3bd59',
                'X-RapidAPI-Host': 'cricket-live-scores4.p.rapidapi.com'
              }
        })
        .then((response)=>{
            let json =response.data.data.matches
            setLiveMatch(json)
            //console.log(json)
            return true
        })
        .catch((error)=>{
          alert('Server Error\n Try Again After Some Time', error)
        })
        return true
    } catch (error) {
        Alert.alert("Error")
        return false
    }
    finally{
      setRefresh(false)
    }
}

const onRefresh=()=>{
  setRefresh(true);
  fetchScore();
}

  useEffect(()=>{
    fetchScore()
  },[])

  

/*   const detail=(id)=>{
      let Detailfiltered=LiveMatch.filter((val,i)=>{
        if(val.id == id){
          return val
        }
      })
      let json =JSON.stringify(Detailfiltered)
      setDetails(json)
      //console.log(json)
      Alert.alert("Data", json)
  }
 */

    return(
      <View style= {{flex:1}}>

      {/* <ImageBackground source={require('../assets/images/ground3.webp')}> */}

        <View style={styles.button}>
          <Button mode='elevated' width={'40%'} onPress={()=>navigation.navigate('Upcoming')}>Completed</Button>
        </View>
        
        <FlatList
                data={LiveMatch}
                refreshing={refresh}
                onRefresh={onRefresh}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                  <TouchableOpacity
                  onPress={()=>{navigation.navigate('Detail', {items: item})}}
                  //onPress={()=>{detail(item.id)}}
                  >
                        {item.state == "LIVE" ? (
                          <View style={styles.flatlistItem}>

                              <View style={{flexDirection:'row', flex:0.85}}>

                                  <View style={{flex:0.35}}>
                                      <Text style={styles.flatText}>{item.teams[0].team.name}</Text>
                                      <Text style={styles.cardtext2}>Score: {item.teams[0].score}</Text>
                                      <Text style={styles.cardtext2}>{item.teams[0].scoreInfo}</Text>
                                  </View>

                                  <Image style={styles.flatText1} source={require('../assets/images/vs.jpg')} />

                                  <View style={{flex:0.35}}>
                                      <Text style={styles.flatText}>{item.teams[1].team.name}</Text>
                                      <Text style={styles.cardtext2}>Score: {item.teams[1].score}</Text>
                                      <Text style={styles.cardtext2}>{item.teams[1].scoreInfo}</Text>
                                  
                                  </View>
                              </View>

                              <View style={{flex:0.15, alignItems:'center'}}>
                                  <Text style={styles.cardtext4}>{item.statusText}</Text>
                              </View>

                          </View>
                          ): (
                            ""
                          )}
                  </TouchableOpacity>

                )}
      />

      {/* </ImageBackground> */}
      </View>
    )
}

  const styles = StyleSheet.create({
  flatlistItem:{
    flex:1,
    marginVertical:'2%',
    marginHorizontal:'8%',
    flexDirection:'row',
    padding:12,
    borderRadius:25,
    backgroundColor:'white',
    height:170,
    flexDirection:'column',
    alignItems:'center',
  },
  cardView:{
    alignItems:'center',
    backgroundColor:'grey',
    borderRadius:20,
    backgroundColor:'white',
  
  },
  button:{
    flexL:0.2,
    marginVertical:10, 
    alignItems:'center'
  },
  flatText:{
    //flex:0.40,
    fontWeight:'bold',
    fontSize:18,
    fontStyle:'italic',
  },
  flatText1:{
    flex:0.2, 
    height:50,
  },
  cardtext2:{
    color:'blue',
    fontWeight:'bold',
    color:'white',
    fontSize:17,
    color:'blue'
  },
  cardtext4:{
    color:'red',
    fontSize:15,
    fontWeight:'bold'
  }
  
});

export default HomeScreen