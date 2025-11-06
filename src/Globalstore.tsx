import React, {createContext, useState, useContext, ReactNode, Children} from "react";

export type Dish = {
    name: string;
    description: string;
    price: number;
    course: string;
}; 

type DishContextType ={
    dishes: Dish[];
    addDish: (dish: Dish) => void;
    removeDish: (dishName: string) => void; 
}; 

const DishContext = createContext<DishContextType | undefined>(undefined);

export const DishProvider = ({children}: {children: ReactNode}) => {
    const [dishes, setDishes] = useState<Dish[]>([]);

    const addDish = (dish:Dish) => {
        setDishes((prev) => [...prev, dish]);
    }; 
    const removeDish = (dishName: string) => {
        setDishes(prev => prev.filter(d => d.name !== dishName));
    }; 

    return (
       <DishContext.Provider value={{ dishes, addDish, removeDish }}>
         {children} 
       </DishContext.Provider>
    );
}; 

export const useDishes = () => {
    const context = useContext(DishContext);
    if (!context) throw new Error("useDishes must be used inside a DishProvider");
    return context;
}; 