import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  ViewPagerAndroidBase,
  TouchableOpacity ,
  RefreshControl,
  Image}
from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import axios from "axios"
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Upcoming=()=>{

  const navigation = useNavigation();
  
  const [UpcomingMatch, setUpcomingMatch]= useState()
  const [details, setDetails]= useState()
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
            setUpcomingMatch(json)
            //console.log(json)
        })
    } catch (error) {
        Alert.alert("Error")
        return false
    }
    finally{
      setRefresh(false)
    }
}

  useEffect(()=>{
    fetchScore()
  },[])

  const onRefresh=()=>{
    setRefresh(true);
    fetchScore();
  }

/*   const detail=(id)=>{
      let Detailfiltered=setUpcomingMatch.filter((val,i)=>{
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
        <FlatList
                data={UpcomingMatch}
                refreshing={refresh}
                onRefresh={onRefresh}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                  <TouchableOpacity
                  onPress={()=>{navigation.navigate('Detail', {items: item})}}
                  //onPress={()=>{detail(item.id)}}
                  >
                        {item.state == "POST" ? (
                          <View style={styles.flatlistItem}>
                              <Text style={styles.flatText}>{item.teams[0].team.name}</Text>
                              <Image style={styles.flatText1} source={require('../assets/images/vs.jpg')} />
                              <Text style={styles.flatText}>{item.teams[1].team.name}</Text>
                          </View>
                          ): ""}
                  </TouchableOpacity>

                )}
        />
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
    height:100,
    flexDirection:'row',
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
    flexDirection:'row', 
    marginVertical:10, 
    justifyContent:'space-evenly'
  },
  flatText:{
    flex:0.40,
    fontWeight:'bold',
    fontSize:18,
  },
  flatText1:{
    flex:0.2, 
    height:50,
  }
  
});

export default Upcoming