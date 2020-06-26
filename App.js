import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AboutPresident from './components/screens/AboutPresident';
import PresidentScreen from './components/screens/PresidentScreen';

function HomeScreen({navigation}) {
  return (
      <PresidentScreen navigation={navigation}/>
  );
}

function PresidentAboutScreen({route, navigation}) {
  const {item} = route.params;

  return (
      <AboutPresident navigation={navigation} president={item} />
  );
}

const Main = createStackNavigator();

export default function App() {
  return (
    // Add Tab bar navigation
    <NavigationContainer>
      <Main.Navigator>
        <Main.Screen name='President' component={HomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Main.Screen name='About President' component={PresidentAboutScreen}
          options={{
            headerShown: false
          }}
        />
        {/* Map Screen */}
      </Main.Navigator>
    </NavigationContainer>
  );
}
