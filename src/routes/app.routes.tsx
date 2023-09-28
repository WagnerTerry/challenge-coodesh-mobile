import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../views/Home';
import {Search} from '../views/Search';
import {History} from '../views/History';
// import Ionic from 'react-native-vector-icons/Ionicons';

 import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const {Navigator, Screen} = createBottomTabNavigator();


export function AppRoutes() {
  return (
    <NavigationContainer>
      <Navigator
      screenOptions={{
        headerShown: false
      }}
      >
        <Screen
         name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused,color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
         />
        <Screen
         name="Search"
          component={Search}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ focused,color, size }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={size} />
            ),
          }}
          />
       <Screen
         name="History"
          component={History}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({ focused,color, size }) => (
              <MaterialCommunityIcons name="book" color={color} size={size} />
            ),
          }}
          />
      </Navigator>
    </NavigationContainer>
  );
}
