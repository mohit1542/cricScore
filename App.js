import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from './screens/Detail';
import HomeScreen from './screens/Home';
import Upcoming from './screens/Upcoming';

const Stack =createStackNavigator()

const Main =()=>{

  return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>

            <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{ headerTitleAlign:'center', headerTitle:'Live Score', headerTintColor:'blue'}}
            />

            <Stack.Screen
            name='Detail'
            component={DetailScreen}
            //options={{headerShown: false}}
            //initialParams={{item:'new', objectid:'12'}}
            />

            <Stack.Screen
            name='Upcoming'
            component={Upcoming}
            //options={{headerShown: false}}
            />

        </Stack.Navigator>
    </NavigationContainer>
  )
}



export default Main