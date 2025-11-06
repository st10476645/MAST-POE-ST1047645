
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


import Homepage from './src/Homepage';
import AddDishesPage from './src/AddDishesPage';  
import FilteredMenuPage from './src/FilteredMenuPage';
import { DishProvider } from './src/Globalstore';
 


const Tab = createBottomTabNavigator();

export default function App() {
  return (
  <DishProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
         tabBarIcon: ({ color, size }) => {
          let iconName: string = 'help'; // default fallback icon 
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Add a Dish') { 
            iconName = 'restaurant';
          } else if (route.name === 'Filter Page') {
            iconName = 'filter-outline';  
          }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          }, 
 

          tabBarActiveTintColor: '#004aad',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Homepage} />
        <Tab.Screen name="Add Dishes" component={AddDishesPage} />
        <Tab.Screen name="Filter Page" component={FilteredMenuPage} /> 
      </Tab.Navigator>
    </NavigationContainer>
  </DishProvider> 
  );
}


   