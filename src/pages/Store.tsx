import React from 'react'
import { Row, Col } from 'react-bootstrap'
import items from '../data/items.json';
import StoreItem from '../components/StoreItem';




function Store() {
  return (
      <> 
          <h1>Store</h1>
          <Row xs={1} md={2} lg={3} className="g-3" >
              {
                  items.map((item) => (
                      <Col key={item.id}><StoreItem {...item}></StoreItem></Col>
                  ))
        }
          </Row>
      </>
  )
}

export default Store