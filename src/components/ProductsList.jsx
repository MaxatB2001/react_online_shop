import React, {useContext} from 'react';
import {Context} from "../index";
import ProductItem from "./ProductItem/ProductItem";

const ProductsList = () => {
    const {product} = useContext(Context)
    return (
        <div>
            {product.products.map(p =>
                <ProductItem product={p} key={p.id}/>
            )}
        </div>
    );
};

export default ProductsList;