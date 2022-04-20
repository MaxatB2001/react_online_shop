import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import classes from './CartItem.module.scss';
import {Button, ButtonGroup} from "react-bootstrap";
import {Context} from "../../index";

const CartItem = observer(({item}) => {
    console.log('ren')
    const {cart} = useContext(Context)
    const deleteFromCart = (item) => {
        cart.removeFromCart(item)
        cart.updateCart()
    }
    return (
        <div className={classes.card}>
            <div className={classes.card__image}>
                <img src={process.env.REACT_APP_API_URL + '/' + item.product.image}/>
            </div>
            <div className={classes.card__body}>
                <div className={classes.card__body__top}>
                    <p>{item.product.name}</p>
                    <p className={classes.card__body__top__price}>{item.product.price} ₽</p>
                </div>
                <div className={classes.card__body__bot}>
                    <div className={classes.card__body__bot__buttons}>
                        <div>
                            <span onClick={() => deleteFromCart(item)} className={classes.card__body__bot__buttons__delete}><i className="bi bi-trash3"></i></span>
                            <span className={classes.card__body__bot__buttons__bookmark}><i className="bi bi-bookmark"></i></span>
                        </div>
                    </div>
                    <ButtonGroup aria-label="Basic example">
                        <Button size="sm" variant="secondary" onClick={() => {cart.decrementQuantity(item)}}>-</Button>
                        <Button size="sm" variant="secondary">{item.quantity}</Button>
                        <Button size="sm" variant="secondary" onClick={() => {cart.incrementQuantity(item)}}>+</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
});

export default CartItem;