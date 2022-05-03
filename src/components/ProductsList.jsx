import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import ProductItem from "./ProductItem/ProductItem";
import MyPagination from "./MyPagination";
import {fetchSubCategoriesOrProducts} from "../queries/ProductsApi";
import {observer} from "mobx-react-lite";

const ProductsList = observer(({slug}) => {
    const {product} = useContext(Context)
    useEffect(() => {
        fetchSubCategoriesOrProducts(slug, product.selectedBrand.id, product.page, 2)
            .then(data => {
                // console.log(data)
                product.setProducts(data.products.rows)
                product.setTotalCount(data.products.count)
            })
    }, [product.page, product.selectedBrand,])
    return (
        <div>
            {product.products.map(p =>
                <ProductItem product={p} key={p.id}/>
            )}
            <MyPagination/>
        </div>
    );
});

export default ProductsList;