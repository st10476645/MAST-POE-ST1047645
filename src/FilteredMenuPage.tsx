 
import { useDishes} from './Globalstore'; 
import React, { useState } from 'react';
import { StyleSheet,ScrollView, Text, TouchableOpacity, View,LayoutAnimation} from 'react-native';

export default function FilteredMenuPage({ navigation }: { navigation: any }) {

  const { dishes} = useDishes(); 
  const [showFilters, setshowFilters] = useState(false);

   const handleFilters = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // This line makes the animation of the button smooth
    setshowFilters(!showFilters); // This line changes the state of the the button 
  };

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filterDishes = activeFilter
  ? dishes.filter(dish => dish.course === activeFilter)
  : dishes;

    return(

<ScrollView style={{ padding: 20 }}> 
  

   <Text style={styles.Title}>Filters</Text> 
        <View>
          <TouchableOpacity
            style={styles.filters}
            onPress={handleFilters}
          >
             <Text style={styles.filterstext}>Filters</Text> 
            <Text style={styles.arrow}>
              {showFilters ? "▼" : "►"}
              {/* This line changes the arrow direction based on the state of the button */}
            </Text>
          </TouchableOpacity> 

          {showFilters && ( 
            <View>
              {["Starters","Main course","Dessert"].map(course => (
                <TouchableOpacity key={course} onPress={() => setActiveFilter(course)}>
                  <Text style={[
                    styles.filterstext,
                    activeFilter === course && { fontWeight: 'bold', color: '#004aad'}
                  ]}>
                    {course}
                  </Text>
                </TouchableOpacity>
              ))}
              
            </View>
          )}
        </View>

  {filterDishes.length === 0 ? (
  <Text style={{ fontWeight: 'bold', textAlign: 'center', marginTop: 20 }} >No dishes match this filter.</Text>

) : (
  
  filterDishes.map((dish, index) => (
    <View key={index} style={styles.card}>
       <Text style={styles.dishName}>🍽️ {dish.name}</Text>
                <Text style={styles.dishDescription}>{dish.description}</Text>
                <Text style={styles.dishPrice}>Price: R{dish.price.toFixed(2)}</Text>
                <Text style={styles.dishCourse}>Course: {dish.course}</Text>
    </View>
  )) 
)}
</ScrollView>       
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Title: {
    fontSize: 24,
    fontWeight:'bold',
    padding: 20,
    textAlign: 'center',
    color: "#004aad",
  }, 
  arrow: { 
    fontSize: 18,
    color: "white",
  }, 
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#4a6da7",
  }, 
  filterstext: {
     color: 'black',
     textAlign: 'center', 
      backgroundColor: "#fff",
  }, 
  card: { padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 8 },
 dishName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  dishDescription: {
    fontStyle: 'italic',
    color: '#555',
  },
  dishPrice: {
    color: '#333',
    marginTop: 4,
  },
  dishCourse: {
    color: '#004aad',
    fontWeight: '600',
    marginTop: 4,
  }, 
});
