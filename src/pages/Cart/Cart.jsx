import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import CartItem from "../../components/CartItem/CartItem";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {CHECKOUT_ROUTE} from "../../utils/consts";
import classes from './Cart.module.scss'
import MyButton from "../../components/UI/Button/Button";

const Cart = observer(() => {
    const navigate = useNavigate()
    const {cart} = useContext(Context)
    return (
        <div className={`${classes.cartPage} Container`}>
            <div className={classes.cartPage__title}>Корзина</div>
            <div className={classes.cartPage__main}>
                <div className={classes.cartPage__main__left}>
                    {cart.items.map(i =>
                        <CartItem item={i} key={i.product.id}/>
                    )}
                </div>
                <div className={classes.cartPage__main__right}>
                    <div className={classes.cartPage__main__right__wrapper}>
                        <div className={classes.cartPage__menu}>
                            <div className={classes.cartPage__menu__finalPrice}>
                                <div className={classes.cartPage__menu__finalPrice__title}>
                                    В корзине
                                </div>
                                <div className={classes.cartPage__menu__finalPrice__count}>
                                    {cart.cartTotalLength} товара
                                </div>
                                <div className={classes.cartPage__menu__finalPrice__total}>
                                    <span>{cart.cartTotalPrice().toFixed(2)}</span>
                                    <span>₽</span>
                                </div>
                                <MyButton onClick={() => navigate(CHECKOUT_ROUTE)} size='m'>перейти к оформлению</MyButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <Container>
        //     <Row className={"mt-4"}><h1 >Моя корзина</h1></Row>
        //     <Row className="d-flex justify-content-center">
        //         <Col md={6}>
        //             {cart.items.map(i =>
        //                 <CartItem item={i} key={i.product.id}/>
        //             )}
        //         </Col>
        //         <Col md={3}>
        //             <div className={"d-flex flex-column align-items-center"} style={{backgroundColor: "#f5f5f5", borderRadius: "10px", marginLeft: "15px", padding: "10px"}}>
        //             <h4>В корзине</h4>
        //             <p>{cart.cartTotalLength} товара</p>
        //             <div>
        //             <span style={{fontSize: '25px', fontWeight: "700"}}>{cart.cartTotalPrice().toFixed(2)}</span>
        //             <span style={{fontSize: '25px', marginLeft: "5px"}}>₽</span>
        //             </div>
        //                 <Button onClick={() => navigate(CHECKOUT_ROUTE)} style={{color: 'white', marginTop: '10px'}} variant={"warning"}>Перейти к оформлению</Button>
        //             </div>
        //         </Col>
        //     </Row>
        // </Container>
    );
});

export default Cart;