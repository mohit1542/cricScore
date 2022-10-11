import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ImageBackground } from 'react-native';

const DetailScreen=({navigation, route})=>{

  const {items}=route.params;

  return(
    <View style={styles.container}>

            <View style={styles.heading} marginTop='5%'>
              <Image style={{width:30, height:25}} source={require('../assets/images/ball.png')}/>
              <Text style={styles.cardtex1}>INFO</Text>
              {/* <Image style={{height:300, width:300}} source={{uri: `https://rapidapi.com/manojkumarch2020/api/cricket-live-scores4${items.teams[1].team.image.url}`}} /> */}
            </View>

            <View style={{flex:0.3, flexDirection:'column'}}>
                <Text style={styles.info}>Match:     {items.title}</Text>
                <Text style={styles.info}>series:      {items.series.name}</Text>
                <Text style={styles.info}>Date:        {items.startDate.substring(0,10)}</Text>
                <Text style={styles.info}>Time:        {items.startTime.substring(11,16)}</Text>
                <Text style={styles.info}>Venue:      {items.ground.longName} </Text>
                <Text style={styles.info}>Format:    {items.format} </Text>
            </View>

            <View style={styles.heading}>
                  <Text style={styles.cardtex1}>SCORECARD</Text>
            </View>

            <View style={{flex:0.2, flexDirection:'row'}}>

                  <View style={{flex:0.5, flexDirection:'column'}}>
                      <Text style={styles.teamName}>{items.teams[0].team.name}</Text>
                      <Text style={styles.team01}>Score: {items.teams[0].score}</Text>
                      <Text style={styles.team01}>Over : {items.teams[0].scoreInfo}</Text>
                  </View>

                  <View style={{flex:0.5, flexDirection:'column'}}>
                      <Text style={styles.teamName}>{items.teams[1].team.name}</Text>
                      <Text style={styles.team01}>Score: {items.teams[1].score}</Text>
                      <Text style={styles.team01}>Over : {items.teams[1].scoreInfo}</Text>
                  </View>

            </View>

            <View style={{flex:0.4, alignItems:'center'}}>
              <Text style={styles.cardtext4}>{items.statusText}</Text>
              <Image style={{height:240 , width:360, marginTop:'5%'}} source={require('../assets/images/ground4.jpg')} />
            </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  heading:{
    flex:0.05, 
    flexDirection:'row', 
    paddingLeft:'5%', 
    backgroundColor:'#dcdcdc',
  },
  cardtex1:{
    fontWeight:'bold',
    fontSize:18,
  },
  teamName:{
    fontWeight:'bold',
    fontSize:17,
    paddingLeft:'5%'
  },
  team01:{
    fontSize:17,
    paddingLeft:'5%'
  },
  cardtext4:{
    color:'red',
    fontSize:15,
    fontWeight:'bold'
  },
  info:{
    fontSize:15,
    paddingLeft:'5%',
    marginTop:'3%',
    color:'#808080'
  }

});

export default DetailScreen