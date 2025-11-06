import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'; 
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,TextInput, Button } from 'react-native';
import {  StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = { 
  App: undefined;
  AddDishesPage: undefined;
}; 

type AddDishesPageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddDishesPage'>; 


export default function AddDishesPage({ navigation }: { navigation: any }) {


const  [coursesFilter, setcoursesFilter] = useState(false); // State to manage course filter visibility

// Function to toggle course filter visibility
const togglecoursesFilter = () => {
    setcoursesFilter(!coursesFilter); // This changes the state from true to false and vice versa
};
// State to manage dishes input
const [Dishname, setDishname] = React.useState('');
const [DishDescription , setDishDescription] = React.useState(''); 
const [DishPrice , setPrice] = React.useState(''); 

// Function to handle adding dish (you can expand this to actually save the dish)
const handleAdding = () => {
    console.log('Dish added:') 
    // Need to add the array logic here to store the dishes 
    
}




    return (
<ScrollView>        

    <View>
       <Text>Choose a course type a fill the dish details below.</Text>
       <TouchableOpacity
                style={styles.Filterbutton}
                onPress={togglecoursesFilter}>
                <Text style={styles.FilterbuttonText}>Filter</Text>
                <Text style={styles.arrow}>{coursesFilter ? "▼" : "►"}</Text> {/* Arrow changes based on state */}
                {coursesFilter && (
                  <View>
                    {/* <TouchableOpacity>Main Course</TouchableOpacity>
                    <TouchableOpacity>Desserts</TouchableOpacity> */}
                    <Button title="Starters" onPress={() => { }} />
                    <Button title="Main Course" onPress={() => { }} />
                    <Button title="Desserts" onPress={() => { }} /> 
                  </View>
                )}
              </TouchableOpacity>
            </View>  
      
      
    
    <View> 
           
    </View>
</ScrollView>
         );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    Filterbutton: { 
    backgroundColor: "#004aad",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  FilterbuttonText: {
    color: "#fff",
    fontSize: 18,
  },
   arrow: {
    fontSize: 18,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor:"#004aad",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }, 
});
