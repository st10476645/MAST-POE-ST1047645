
import React, { useState } from 'react'; 
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { useDishes } from './Globalstore';



export default function Homepage ({ navigation }: { navigation: any }) {

  const {dishes } = useDishes(); 

    const [selectedDishes, setSelectedDishes] = useState<Array<{name: String; description: String; price: number;}>>([]); // State to track selected dishes 
  
    //Function to toggle the dish selection
    const toggleDishSelection = (dish: {name: string; description: string; price: number}) => { 
    const isSelected = selectedDishes.some(d => d.name === dish.name); 
    if (isSelected) {
      setSelectedDishes(prev => prev.filter(d => d.name !== dish.name));
    } else {
      setSelectedDishes(prev => [...prev, dish]);
    }
  };

  const averagePrice = selectedDishes.length > 0
  ? selectedDishes.reduce((sum, dish) => sum + dish.price, 0) / selectedDishes.length : 0;

    
  return (
  <ScrollView 
   style={styles.scrollBackground}
    contentContainerStyle={styles.container}>
    <View> 
      <Text style={styles.WelcomeText}> Welcome Christofell 🧑🏼‍🍳, let's plan together a well-balanced meal!</Text>
      
      {dishes.length === 0 ? (
        <>
        <Text style={{ fontWeight: 'bold', marginTop: 8, fontSize: 18, textAlign: 'center' }}>
          Below the dishes that you added will be displayed.
        </Text>
        
        <Text style={{ fontWeight: 'bold', marginTop: 8, fontSize: 18, textAlign: 'center' }}>
          No dishes added yet.
        </Text>
        </>
        ) : (
        
        <Text style={{ fontWeight: 'bold', marginTop: 8, fontSize: 25, textAlign: 'center', color: "#004aad"  }}>
          Your memu
        </Text>
      )} 


        {dishes.map((dish, index) => {
          const isSelected = selectedDishes.some(d => d.name === dish.name);
          return (
          <TouchableOpacity
          key={index}
          onPress={() => toggleDishSelection(dish)}
          style={[styles.dishItem,isSelected && styles.selectedDishItem ]}>
         
          <Text style={styles.dishName}>🍽️ {dish.name}</Text>
          <Text style={styles.dishDescription}>{dish.description}</Text>
          <Text style={styles.dishPrice}>Price: R{dish.price.toFixed(2)}</Text>
          <Text style={styles.dishCourse}>Course: {dish.course}</Text>
          
         
        </TouchableOpacity> );
      })}
      <Text style={{ fontWeight: 'bold', marginTop: 20, padding: 115, paddingBottom: 15, fontSize: 18, textAlign: 'center' }}>
        Selected dishes: {selectedDishes.length}
        </Text>
        <Text style={{ fontWeight: 'bold', marginTop: 10, padding: 10, paddingBottom: 35, fontSize: 18, textAlign: 'center'}}>
          Average price of the selected price: R{averagePrice.toFixed(2)} 
          </Text>
          
        
    </View>  
  </ScrollView> 
    );
  }
  
  const styles = StyleSheet.create({
    scrollBackground: {
      flex: 1,
      backgroundColor: '#f5faff',
    },
    container: { 
      paddingBottom: 30, 
      alignItems: 'center',
      justifyContent: 'center',
    },
   //backgroundColor: '#87CEEB' 
    WelcomeText: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 10,
      textAlign: 'center', 
      padding: 30,
    }, 
    Title: {
      fontSize: 25,
      fontWeight: 'bold',
      padding: 15, 
    },
   // Styling for dish cards and it's components
    dishItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },

  selectedDishItem: {
   backgroundColor:"#4682B4",  // or #CBC3E3 OR #E6E6FA OR #AFDBF5 or #4a6da7
  }, 

  dishName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 8,
  },

  dishDescription: {
    fontStyle: 'italic',
    color: 'black',
    textAlign:'center', 
  },
  dishPrice: {
    color: '#333',
    marginTop: 4,
    paddingBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold', 
  },

  dishCourse: {
    color: '#004aad',
    fontWeight: '600',
    marginTop: 4,
    paddingBottom: 8,
    textAlign: 'center',
  }, 

  
  
  // End of styling 
  
  
  }
  );
  
    
