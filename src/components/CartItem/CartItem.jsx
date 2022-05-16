import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import classes from './CartItem.module.scss';
import {Context} from "../../index";

const CartItem = observer(({item}) => {
    const {cart} = useContext(Context)
    const deleteFromCart = (item) => {
        cart.removeFromCart(item)
        cart.updateCart()
    }
    return (
        <div className={classes.card}>
            <div className={classes.card__imgContainer}>
                <img className={classes.card__image} src={process.env.REACT_APP_API_URL + '/' + item.product.image}/>
            </div>
            <div className={classes.card__header}>
                <div className={classes.card__header__code}>Код товара: {item.product.id}</div>
                <div className={classes.card__header__title}>
                    {item.product.name}
                </div>
            </div>
            <div className={classes.card__quantity__price}>
            <div className={classes.card__quantity}>
                <button onClick={() => {cart.decrementQuantity(item)}} className={classes.card__quantity__buttons}>-</button>
                <input onChange={e => cart.setItemQuantity(item, Number(e.target.value))} value={item.quantity} className={classes.card__quantity__input}/>
                <button onClick={() => {cart.incrementQuantity(item)}} className={classes.card__quantity__buttons}>+</button>
            </div>
            <div className={classes.card__price}>
                <span>{cart.getItemTotal(item)}</span>
                <span>₽</span>
            </div>
            </div>
            <div className={classes.card__buttons}>
                <span onClick={() => deleteFromCart(item)} className={classes.card__buttons__button}><i className="bi bi-trash3"></i></span>
                <span className={classes.card__buttons__button}><i style={{width: '100%', height: '100%'}} className="bi bi-bookmark"></i></span>
            </div>
        </div>
    );
});

export default CartItem;