import React, {createContext, useState, useContext, ReactNode, Children} from "react"; // necessary imports 


// define the structure of a dish object
export type Dish = {
    name: string;
    description: string;
    price: number;
    course: string;
}; 
// Define the context value type: dishes array + two updater functions
type DishContextType = {
    dishes: Dish[];
    addDish: (dish: Dish) => void;
    removeDish: (dishName: string) => void;
};


const DishContext = createContext<DishContextType | undefined>(undefined);


// Define the provider component that wraps your app and supplies dish state
export const DishProvider = ({ children }: { children: ReactNode }) => {

    // Initialize dishes state as an empty array
    const [dishes, setDishes] = useState<Dish[]>([]);

    // Function to add a new dish to the list ( using the dish name) 
    const addDish = (dish:Dish) => {
        setDishes((prev) => [...prev, dish]);
    }; 

    // Function to remove a dish from the list
    const removeDish = (dishName: string) => {
        setDishes(prev => prev.filter(d => d.name !== dishName));
    }; 

    // Provide the dish state and updater functions to children components 
    return (
        <DishContext.Provider value={{ dishes, addDish, removeDish }}>
            {children}
        </DishContext.Provider>
    );
};

// Custom hook to access dish context safely
export const useDishes = () => {
    const context = useContext(DishContext);
    if (!context) throw new Error("useDishes must be used inside a DishProvider");
    return context;
};
