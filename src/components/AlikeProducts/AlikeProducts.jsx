import React, {useEffect, useState} from 'react';
import {fetchAlikeProducts} from "../../queries/ProductsApi";
import Slider from "../Slider/Slider";
import classes from './AlikeProducts.module.scss'

const AlikeProducts = ({product}) => {
    const [alikeProducts, setAlikeProducts] = useState([])
    useEffect(() => {
        fetchAlikeProducts(product.categoryId, product.brandId, product.price).then(data => setAlikeProducts(data))
    }, [])
    return (
        <div className={classes.alike}>
            <Slider products={alikeProducts}/>
        </div>
    );
};

export default AlikeProducts;