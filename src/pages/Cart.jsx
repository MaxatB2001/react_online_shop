import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import CartItem from "../components/CartItem/CartItem";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Context} from "../index";

const Cart = observer(() => {
    const {cart} = useContext(Context)
    return (
        <Container>
            <h1 >Моя корзина</h1>
            <Row className="d-flex justify-content-center">
                <Col md={6}>
                    {cart.items.map(i =>
                        <CartItem item={i} key={i.product.id}/>
                    )}
                </Col>
                <Col md={3}>
                    <div className={"d-flex flex-column align-items-center"} style={{backgroundColor: "#f5f5f5", borderRadius: "10px", marginLeft: "15px", padding: "10px"}}>
                    <h4>В корзине</h4>
                    <p>{cart.cartTotalLength} товара</p>
                    <div>
                    <span style={{fontSize: '25px', fontWeight: "700"}}>{cart.cartTotalPrice().toFixed(2)}</span>
                    <span style={{fontSize: '25px', marginLeft: "5px"}}>₽</span>
                    </div>
                        <Button style={{color: 'white', marginTop: '10px'}} variant={"warning"}>Перейти к оформлению</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default Cart;