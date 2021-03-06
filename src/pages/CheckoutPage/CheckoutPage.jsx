import React, {useContext, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createOrder} from "../../queries/OrderApi";
import {useNavigate} from "react-router-dom";

const CheckoutPage = () => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const addressSting = (obj) => {
        let string = `г ${address.city}, ул ${address.street}, д ${address.home}, стр ${address.building}, к ${address.corps}, подъезд ${address.entrance}, ${address.floor} этаж, кв ${address.apartment}`
        return string
    }
    const {cart} =  useContext(Context)
    const [address, setAddress] = useState({ city: '', street: '', home: '', building: '', corps: '', entrance: '', floor: '', apartment: '' })
    const [comment, setComment] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('+7')
    const [email, setEmail] = useState('')
    const order = {
        address: addressSting(address),
        comment,
        firstName,
        lastName,
        phone,
        email,
        paidAmount: cart.cartTotalPrice(),
        userId: user.user.id,
        items: JSON.stringify(cart.items)
    }
    const submitOrder = () => {
        createOrder(order).then(res => console.log(res))
    }
    return (
        <Container>
            <Row className={"mt-4"}>
                <h1>Оформление заказа</h1>
            </Row>
            <Row className={"mt-4"}>
                <Col md={8}>
                <Row>
                <Row>
                    <h4>1. Способ получения</h4>
                    <Row className={"mt-2"}>
                    <Col md={6}>
                        <Form.Label>Город</Form.Label>
                        <Form.Control
                            className={"borderBot"}
                            value={address.city}
                            onChange={e => setAddress({ ...address, city: e.target.value })}
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Label>Улица</Form.Label>
                        <Form.Control
                            className={"borderBot"}
                            value={address.street}
                            onChange={e => setAddress({ ...address, street: e.target.value })}
                        />
                    </Col>
                    </Row>
                </Row>
                <Row className={"mt-3"}>
                    <Col md={4}>
                        <Form.Label>Дом</Form.Label>
                        <Form.Control
                            className={"borderBot"}
                            value={address.home}
                            onChange={e => setAddress({ ...address, home: e.target.value })}
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Label>Стоение</Form.Label>
                        <Form.Control
                            className={"borderBot"}
                            value={address.building}
                            onChange={e => setAddress({ ...address, building: e.target.value })}
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Label>Корпус</Form.Label>
                        <Form.Control
                            className={"borderBot"}
                            value={address.corps}
                            onChange={e => setAddress({ ...address, corps: e.target.value })}
                        />
                    </Col>
                </Row>
                    <Row className={"mt-3"}>
                        <Col md={4}>
                            <Form.Label>Подъезд</Form.Label>
                            <Form.Control
                                className={"borderBot"}
                                value={address.entrance}
                                onChange={e => setAddress({ ...address, entrance: e.target.value })}
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Label>Этаж</Form.Label>
                            <Form.Control
                                className={"borderBot"}
                                value={address.floor}
                                onChange={e => setAddress({ ...address, floor: e.target.value })}
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Label>Квартира</Form.Label>
                            <Form.Control
                                className={"borderBot"}
                                value={address.apartment}
                                onChange={e => setAddress({ ...address, apartment: e.target.value })}
                            />
                        </Col>
                    </Row>
                    <Row className={"mt-3"}>
                        <Col md={12}>
                            <Form.Label>Комментарий к заказу</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                className={"borderBot"}
                            />
                        </Col>
                    </Row>
                </Row>
                <Row className={"mt-5"}>
                    <h4>2. Контактные данные</h4>
                    <Row className={"mt-2"}>
                        <Col md={6}>
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                className={"borderBot"}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                className={"borderBot"}
                            />
                        </Col>
                    </Row>
                    <Row className={"mt-3"}>
                        <Col md={12}>
                            <Form.Label>Телефон</Form.Label>
                            <Form.Control
                                type="tel"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                className={"borderBot"}
                            />
                        </Col>
                    </Row>
                </Row>
                <Row className={"mt-5"}>
                    <h4>3. Оплата</h4>
                    <Row className={"mt-2"}>
                    <Col md={6}>
                        <Form.Label>email для чека</Form.Label>
                        <Form.Control
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={"borderBot"}
                        />
                    </Col>
                    </Row>
                </Row>
                <Row className={"mt-4"}>
                    <Row>
                    <div>
                    <span style={{fontSize: "30px"}}>Итого: {cart.cartTotalPrice()}</span>
                        <span style={{color: "#b3b3b7", fontSize: "29px", marginLeft: "5px"}}>₽</span>
                    </div>
                    </Row>
                    <Row>
                        <span>{cart.cartTotalLength} товара</span>
                    </Row>
                    <Row>
                        <Col md={5}>
                            <Button onClick={submitOrder} variant={"warning"} style={{color: "white"}} size={"lg"}>Оплатить</Button>
                        </Col>
                    </Row>
                </Row>
                </Col>
                <Col md={3}>
                    <div className={"d-flex flex-column align-items-center"} style={{backgroundColor: "#f5f5f5", borderRadius: "10px"}}>
                        <div style={{padding: "40px 10px 40px 10px"}}>
                        <h4>{cart.items.length} Позиции в заказе</h4>
                        <div style={{borderBottom: "1px solid black"}}>
                        {cart.items.map(i =>
                            <div>
                                <div style={{fontWeight: "bold", fontSize: "14px"}}>{i.product.name}</div>
                                <div style={{fontSize: "12px"}}>{i.product.price} ₽ - {i.quantity} шт.</div>
                            </div>
                        )}
                        </div>
                            <div style={{marginTop: "10px"}} className={"d-flex justify-content-between align-items-center"}>
                                <span>Итого</span>
                                <div style={{fontSize: "24px"}}>
                                <span style={{fontWeight: "500"}}>{cart.cartTotalPrice()}</span>
                                    <span style={{color: "#b3b3b7", marginLeft: "5px"}}>₽</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutPage;