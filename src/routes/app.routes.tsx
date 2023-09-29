import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../views/Home';
import { Historic } from '../views/Historic';
// import Ionic from 'react-native-vector-icons/Ionicons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Favorites } from '../views/Favorites';


const { Navigator, Screen } = createBottomTabNavigator();


export function AppRoutes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Screen
          name="Word list"
          component={Home}
          options={{
            tabBarLabel: 'Word list',
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name="notebook" color={color} size={size} />
            ),
          }}
        />
        <Screen
          name="Historic"
          component={Historic}
          options={{
            tabBarLabel: 'Historic',
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name="book" color={color} size={size} />
            ),
          }}
        />
        <Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name="star-box" color={color} size={size} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
