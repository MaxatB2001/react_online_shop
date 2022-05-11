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
    const navigate = useNavigate()
    const addToCart = () => {
        const item = {
            product,
            quantity: 1,
        }
        cart.addToCart(item)
    }
    return (
        <div onClick={() => navigate(PRODUCT_ROUTE + '/' + product.slug)} className={classes.product}>
            <span className={classes.bookmark}><i className="bi bi-bookmark-plus"></i></span>
            <div className={classes.imageBlock}>
                <img src={process.env.REACT_APP_API_URL + product.image} className={classes.image} alt={"alt"}/>
            </div>
            <div className={classes.middleBLock}>
                <div className={classes.title}>{product.name}</div>
                <div className={classes.meta}>
                    <i style={{color: "orange"}} className="bi bi-star-fill"></i>
                    <span style={{marginLeft: "5px"}}>{starAvg}</span>
                    <i style={{marginLeft: "15px"}} className="bi bi-chat"></i>
                    <span style={{marginLeft: "5px"}}>{product.reviews.length}</span>
                    <span style={{marginLeft: "12px"}}>Код товара: {product.id}</span>
                </div>
                <hr className={classes.cardHr}/>
                <div className={classes.featuresList}>
                    {product.product_features.map(f =>
                        <div key={f.id}>
                            <span style={{color: "#5d5d64"}}>{f.title}</span>
                            <span style={{marginLeft: "5px"}}>{f.description}</span>
                        </div>
                    )}
                </div>
            </div>
            <div className={classes.leftBlock}>
                <div className={classes.leftWrapper}>
                    <span className={classes.priceBlock}>
                        <span>{product.price}</span>
                        <span style={{color: "#b3b3b7", marginLeft: "5px"}}>₽</span>
                    </span>
                    <Button style={{color: "white"}} onClick={() => addToCart()} variant={"warning"}><span className="bi bi-cart-plus"></span> В корзину</Button>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;