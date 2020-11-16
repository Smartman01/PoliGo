import React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AboutPresident from './components/screens/AboutPresident';
import PresidentScreen from './components/screens/PresidentScreen';
import VotingInfoScreen from './components/screens/VotingInfoScreen';
import OfficialsScreen from './components/screens/OfficalsScreen';
import OfficialsInfo from './components/screens/OfficialIsnfo'
import FavoritesScreen from './components/screens/FavoritesScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import GetLocation from './components/GetLocation'

let address = loadAddress()

function HomeScreen({ navigation }) {
  return (
    <PresidentScreen navigation={navigation} />
  );
}

function PresidentAboutScreen({ route, navigation }) {
  const { item } = route.params;

  return <AboutPresident navigation={navigation} president={item} />
}

function VotingScreen({ navigation }) {
  return (
    <VotingInfoScreen navigation={navigation} address={address} />
  );
}

function Officials({ navigation }) {
  return <OfficialsScreen navigation={navigation} address={address} />
}

function OfficialsInfoScreen({ route, navigation }) {
  const { item } = route.params

  return <OfficialsInfo navigation={navigation} info={item} />
}

function Favorites({ navigation }) {
  return <FavoritesScreen navigation={navigation} />
}

function Settings({ navigation }) {
  return <SettingsScreen navigation={navigation} />
}

const Main = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Officials' component={Officials} />
      <Tab.Screen name='VoterInfo' component={VotingScreen} />
      {/* <Tab.Screen name='Favorites' component={Favorites} /> */}
      <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
  )
}

async function loadAddress() {
  try {
    let jsonValue = await AsyncStorage.getItem('userAddress')
    let addressObj = null

    if (jsonValue != null)
      addressObj = JSON.parse(jsonValue)

    console.log(addressObj.address);

    return addressObj.address || GetLocation()
  } catch (err) {
    alert(err)
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Main.Navigator>
        <Main.Screen name='President' component={MyTabs}
          options={{
            headerShown: false
          }}
        />
        <Main.Screen name='About President' component={PresidentAboutScreen}
          options={{
            headerShown: false
          }}
        />
        <Main.Screen name='Official Info' component={OfficialsInfoScreen}
          options={{
            headerShown: false
          }}
        />
      </Main.Navigator>
    </NavigationContainer>
  );
}
