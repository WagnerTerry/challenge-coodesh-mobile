import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../views/Home';
import {Search} from '../views/Search';
import {History} from '../views/History';

const {Navigator, Screen} = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} />
        <Screen name="Search" component={Search} />
        <Screen name="History" component={History} />
      </Navigator>
    </NavigationContainer>
  );
}
