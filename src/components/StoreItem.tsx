import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useShoppingCartContext } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utilities/formatCurrency'


type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl:string,
}



function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const { getQuantity, increasingCartQuantity, decreasingCartQuantity, removeFromCart } = useShoppingCartContext();

     const quality = getQuantity(id);
  return (
      <Card>
          <Card.Img variant='top' src={imgUrl} height="200px" style={{ objectFit: "cover" }}></Card.Img>
          <Card.Body className='d-flex flex-column'>
              <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                  <span className='fs-2'>{name}</span>
                  <span className='text-muted'>{formatCurrency(price)}</span>
              </Card.Title>
              <div className='mt-auto'>
                  {
                      quality === 0 ? (
                      <Button className='w-100' onClick={()=>increasingCartQuantity(id)} >+ Add To Cart</Button>
                      ) : <div className='d-flex flex-column align-items-center' style={{gap:".5rem"}}>
                              <div className='d-flex justify-content-center align-items-center' style={{gap:".5rem"}}>
                                  <Button onClick={()=>increasingCartQuantity(id)} >+</Button>
                                  <div>
                                      <span className='fs-3'>{quality}</span>
                                       in Cart
                                  </div>       
                                  <Button onClick={()=>decreasingCartQuantity(id)} >-</Button>
                              </div>
                             <Button variant='danger' onClick={()=>removeFromCart(id)}>remove</Button>
                              
                      </div>
                  }
              </div>
          </Card.Body>
     </Card>
  )
}

export default StoreItem