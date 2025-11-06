 
import { useDishes, Dish } from './Globalstore'; 
import { StyleSheet,ScrollView, Text, TouchableOpacity, View } from 'react-native';


const { dishes, removeDish} = useDishes(); 

export default function FilteredMenuPage({ navigation }: { navigation: any }) {
    return(

      <ScrollView style={{ padding: 20 }}>
  <Text style={styles.Title}>Menu</Text>
  
  {dishes.length === 0 ? (
    <Text>No added dishes yet.</Text>
  ) : (
    dishes.map((dish, index) => (
      <View key={index} style={styles.card}>
        <Text style={styles.dishName}>{dish.name}</Text>
        <Text>{dish.description}</Text>
        <Text>Price: R{dish.price.toFixed(2)}</Text>
        <Text>Course: {dish.course}</Text>
        
        {/* Optional delete button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeDish(dish.name)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
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
    color: "#004aad",
  }, 
  card: { padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 8 },
  dishName: { fontWeight: 'bold', fontSize: 16 },
  deleteButton: { marginTop: 10, backgroundColor: '#004aad', padding: 5, borderRadius: 5 },
  deleteText: { color: 'white', textAlign: 'center' },
});
