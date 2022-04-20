import React, {useContext, useMemo} from 'react';
import classes from './ProductItem.module.scss'
import {useNavigate} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../utils/consts";
import {Button} from "react-bootstrap";
import {Context} from "../../index";
import {countAvgStars} from "../../utils/helpers";

const ProductItem = ({product}) => {
    const {cart} = useContext(Context)
    const starAvg = useMemo(() => countAvgStars(product.reviews), [product])
    console.log(product)
    const navigate = useNavigate()
    const addToCart = () => {
        const item = {
            product,
            quantity: 1,
        }
        cart.addToCart(item)
    }
    return (
        <div style={{cursor: 'pointer'}} onClick={() => navigate(PRODUCT_ROUTE + '/' + product.slug)} className={classes.product}>
            <div className={classes.product__image}>
                <img src={process.env.REACT_APP_API_URL + product.image} alt={"alt"}/>
            </div>
            <div className={classes.product__description}>
                <span className={classes.product__description__bookmark}><i className="bi bi-bookmark-plus"></i></span>
                <h2 style={{marginBottom: "5px"}}>{product.name}</h2>
                <i style={{color: "orange"}} className="bi bi-star-fill"></i>
                <span style={{marginLeft: "5px"}}>{starAvg.toFixed(2)}</span>
                <i style={{marginLeft: "15px"}} className="bi bi-chat"></i>
                <span style={{marginLeft: "5px"}}>{product.reviews.length}</span>
                <span style={{marginLeft: "12px"}}>Код товара: {product.id}</span>
                {product.product_features.map(f =>
                    <div key={f.id}>
                        <span style={{color: "#5d5d64"}}>{f.title}</span>
                        <span style={{marginLeft: "5px"}}>{f.description}</span>
                    </div>
                )}
                <h4>{product.price} ₽</h4>
                <p>
                    <Button style={{color: "white"}} onClick={() => addToCart()} variant={"warning"}><span className="bi bi-cart-plus"></span> В корзину</Button>
                </p>
            </div>
        </div>
    );
};

export default ProductItem;