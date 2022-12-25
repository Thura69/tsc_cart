import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCartContext } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utilities/formatCurrency'
import CartItem from './CartItem'
import items from '../data/items.json';

type shoppingCartPorp = {
    isOpen:boolean
}

function ShoppingCart({isOpen} : shoppingCartPorp) {
    const { closeCart,cartItems } = useShoppingCartContext();
  return (
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
          <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
          </Offcanvas.Header>  
          <Offcanvas.Body>
        <Stack gap={3}>
          {
                      cartItems.map(item => (
                <CartItem key={item.id} {...item} />
            ))
                  }        
                  
        <div className='ms-auto fs-5 fw-bold'>
         Total{" "}
         {
            formatCurrency(
                cartItems.reduce((total, cartItem) => {
                    const item = items.find(i => i.id === cartItem.id)
                 return total + (item?.price || 0) * cartItem.quantity   
            
                },0)
            )
         }   
        </div>
        </Stack>
          </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart