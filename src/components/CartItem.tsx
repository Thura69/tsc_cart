import React from 'react'
import { Stack,Button } from 'react-bootstrap';
import { useShoppingCartContext } from '../context/ShoppingCartContext'
import items from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';

type CartItemsProps = {
    id: number,
    quantity:number,
}


function CartItem({ id, quantity }: CartItemsProps) {
    const { removeFromCart } = useShoppingCartContext(); 
    const item = items.find(i => i.id === id)
    if(item == null) return null
    

  return (
      <Stack direction='horizontal' gap={2} className="d-flex align-items-center">
          <img src={item.imgUrl} style={{ width: '125px', height: '75px', objectFit: 'cover' }} />  
          
          <div className='me-auto'>
              <div>
                   {item.name}{" "}
              {
                  quantity > 1 && (
                      <span className='text-muted' style={{fontSize:"0.65rem"}}>x{quantity}</span>
                  )
              }
              </div>
              
              <div className='text-muted' style={{fontSize:'0.75rem'}}>
                  {formatCurrency(item.price)}
              </div>
          </div>
          <div>{formatCurrency(item.price * quantity)}</div>
          <Button variant='outline-danger' size='sm' onClick={()=>{removeFromCart(item.id)}}>&times;</Button>
    </Stack>
  )
}

export default CartItem