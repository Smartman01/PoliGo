import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AboutPresident from './components/screens/AboutPresident';
import PresidentScreen from './components/screens/PresidentScreen';
import VotingInfoScreen from './components/screens/VotingInfoScreen';
import OfficialsScreen from './components/screens/OfficalsScreen';
import FavoritesScreen from './components/screens/FavoritesScreen';
import SettingsScreen from './components/screens/SettingsScreen';


function HomeScreen({ navigation }) {
  return (
    <PresidentScreen navigation={navigation} />
  );
}

function PresidentAboutScreen({ route, navigation }) {
  const { item } = route.params;

  return (
    <AboutPresident navigation={navigation} president={item} />
  );
}

function VotingScreen({ navigation }) {
  return (
    <VotingInfoScreen navigation={navigation} />
  );
}

function Officials({ navigation }) {
  return <OfficialsScreen navigation={navigation}/>
}

function Favorites({ navigation }) {
  return <FavoritesScreen navigation={navigation}/>
}

function Settings({ navigation }) {
  return <SettingsScreen navigation={navigation}/>
}

const Main = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Officials' component={Officials} />
      <Tab.Screen name='Favorites' component={Favorites} />
      <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
  )
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
        <Main.Screen name='Voting Screen' component={VotingScreen}
          options={{
            headerShown: false
          }}
        />
      </Main.Navigator>
    </NavigationContainer>
  );
}
