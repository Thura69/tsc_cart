import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";


type ShoppingCartProviderProps = {
    children:ReactNode
}
type CartItemsProps = {
    id: number,
    quantity:number,
}
type ShoppingCartContextProps = {
    openCart: () => void,
    closeCart:()=> void,
    getQuantity: (id: number) => number,
    increasingCartQuantity: (id: number) => void,
    decreasingCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    cartQuantity: number,
    cartItems: CartItemsProps[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);


export function useShoppingCartContext() {
    return useContext(ShoppingCartContext);
}



export function ShoppingCartContextProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, SetIsOpen] = useState(false);
    const [cartItems, SetCartItems] = useLocalStorage<CartItemsProps[]>("shopping-cart",[])
    
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    const openCart = () => SetIsOpen(true);
    const closeCart = () => SetIsOpen(false);

    function getQuantity(id:number) {
     return cartItems.find(items=> items.id === id)?.quantity || 0
 }
   
    function increasingCartQuantity(id: number) {
        SetCartItems(currentItems => {
            if (currentItems.find(items => items.id === id) == null) {
               return [...currentItems,{id,quantity:1}]
            } else {
              return  currentItems.map(items => {
                    if (items.id === id) {
                        return {...items,quantity:items.quantity + 1}
                    } else {
                        return items
                    }
                })
           }
         })
    }
    
    function decreasingCartQuantity(id: number) {
        SetCartItems(currentItems => {
            if (currentItems.find(items => items.id == id)?.quantity === 1) {
               return currentItems.filter(items => items.id !== id)
            } else {
              return  currentItems.map(items => {
                    if (items.id === id) {
                        return {...items,quantity:items.quantity - 1}
                    } else {
                        return items
                    }
                })
           }
         })
    }
    
    function removeFromCart(id:number) {
        SetCartItems(currentItems => {
            return currentItems.filter(items=> items.id !== id)
        })
    }



    return <ShoppingCartContext.Provider value={{getQuantity,increasingCartQuantity,decreasingCartQuantity,removeFromCart,cartQuantity,openCart,closeCart,cartItems}}>
        {children}
        <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
}