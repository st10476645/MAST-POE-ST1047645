import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'; 
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useDishes } from './Globalstore';



export default function Homepage ({ navigation }: { navigation: any }) {

  const {dishes, addDish} = useDishes();

    const [NewName, setNewName] = useState(''); 
    const [NewDescription, setNewDescription] = useState('');
    const [NewPrice, setNewPrice] = useState('');
    const [NewCourse, setNewCourse] = useState('')
  
    // State to manage modal visibility.(false = pop up closed, true = pop up open)
    const [modalVisible, setModalVisible] = React.useState(false); 
  
    const closeModal = () => {
      setModalVisible(false);
       setNewName("");
       setNewDescription("");
       setNewPrice("");
       setNewCourse(""); 
    }; 
  
    const HandleAddDish = () => { 
      if (NewName && NewDescription && NewPrice) {
         addDish({ name: NewName, description: NewDescription, price: parseFloat(NewPrice), course: NewCourse,});
        
        setNewName(""); 
        setNewDescription("");
        setNewPrice("");
        setModalVisible(false);
      }
    }; 
  
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
    const courses = ["Starters", "Main course", "Dessert"]; 
    
  return (
  
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.WelcomeText}> Welcome, Christofell, let's plan together a well-balanced meal.</Text>

          <Text style={{ fontWeight: 'bold', marginTop: 20 }}> Click down below to add the dishes</Text> 
  
          <TouchableOpacity style={styles.addDishButton} 
          onPress={() => setModalVisible(true)}>
            <Text style={styles.addDishButtonText}>Add Dish</Text>
          </TouchableOpacity>  
  
          
          
  
          <Modal visible={modalVisible} onRequestClose={closeModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.Title}> Add Dish Details</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setNewName}
                  value={NewName}
                  placeholder="Enter the dish name"
                  />
  
                <TextInput 
                style={styles.input}
                onChangeText={setNewDescription}
                value={NewDescription}
                placeholder="Enter the dish description"
                />
  
                <TextInput
                style={styles.input}
                onChangeText={setNewPrice}  
                value={NewPrice}
                placeholder="Enter the dish price"
                keyboardType= "numeric" 
                />
  
                <Text style={{fontWeight: 'bold', marginBottom: 10}}>Select course</Text>
                <View style={styles.coursesButtonsContainer}>
                  {courses.map((course) =>{ 
                    const isSelected = NewCourse === course;
                    return(
                      <TouchableOpacity
                      key={course}
                      onPress={() => setNewCourse(course)}
                      style={[
                        styles.coursesButton, 
                        isSelected && styles.courseButtonSelected
                      ]}
                      >
                        <Text style={isSelected ? styles.coursesButtonTextSelected : styles.courseButtonText}>
                          {course}
                        </Text>
                      </TouchableOpacity>
                    )
  
                  })} 
                </View>
  
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                    <Text style={styles.cancelButtonText}>Cancel</Text> 
  
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addDishButton} onPress={HandleAddDish}>
                    <Text style={styles.addDishButtonText}>Add Dish</Text>
                  </TouchableOpacity>
  
                </View>
              </View>
            </View>
          </Modal>
  
          {dishes.map((dish, index) => { 
    const isSelected = selectedDishes.some(d => d.name === dish.name);
    return (
      <TouchableOpacity
        key={index}
        onPress={() => toggleDishSelection(dish)}
        style={[
          styles.dishItem,
          isSelected && styles.selectedDishItem
        ]}
      >
        <Text style={styles.dishName}>• {dish.name}</Text>
        <Text style={styles.dishDescription}>{dish.description}</Text>
        <Text style={styles.dishPrice}>Price: R{dish.price.toFixed(2)}</Text> 
        <Text style= {styles.dishCourse}>Course: {dish.course}</Text>
      </TouchableOpacity>
    );
  })}
  
  
  <Text style={{ fontWeight: 'bold', marginTop: 20, padding:10 , paddingBottom: 30 }}>
    Selected dishes: {selectedDishes.length}
  </Text>
   
  
         
  
  
  
        </View>  
         
         
          <StatusBar style="auto" />
      
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
    WelcomeText: {
      fontSize: 15,
      fontWeight: 'bold',
      margin: 10,
      textAlign: 'center',
      padding: 30,
    }, 
  
  
    addDishButton: {
    backgroundColor: '#004aad', 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  
  addDishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  cancelButton: {
     backgroundColor: '#004aad', 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  
  cancelButtonText: { 
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  
  
  
  
  
    input: {
      borderWidth: 1,
      borderColor: "#004aad",
      borderRadius: 5,
      padding: 20,
      marginBottom: 10,
    },
    modalOverlay:{
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    modalContent:{
      width: '80%',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10, 
    },
    Title: {
      fontSize: 25,
      fontWeight: 'bold',
      padding: 15, 
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
       
    }, 
    coursesButtonsContainer:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 15,
    },
    coursesButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#004aad',
  },
  courseButtonSelected: {
    backgroundColor: '#004aad',
  },
  coursesButtonTextSelected: {
    color: 'white'
  },
  courseButtonText: {
    color: '#004aad',
  },
  
    dishItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: '90%',
  },
  selectedDishItem: {
   backgroundColor:"#87CEEB", 
  },
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
  
  
  }
  );
  
    
