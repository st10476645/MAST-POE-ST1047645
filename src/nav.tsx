
import React, { useState } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Homepage from './Homepage';
import AddDishesPage from './AddDishesPage'; 





const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
         tabBarIcon: ({ color, size }) => {
          let iconName: string = 'help'; // default fallback icon 
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Add Dishes') {
            iconName = 'restaurant';}
            
            return <Ionicons name={iconName} size={size} color={color} />;}
,
          tabBarActiveTintColor: '#004aad',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Homepage} />
        <Tab.Screen name="Add Dishes" component={AddDishesPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
