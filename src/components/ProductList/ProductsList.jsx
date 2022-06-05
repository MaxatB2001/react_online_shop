import React, {useContext, useEffect} from 'react';
import {Context} from "../../index";
import ProductItem from "../ProductItem/ProductItem";
import MyPagination from "../MyPagination";
import {fetchSubCategoriesOrProducts} from "../../queries/ProductsApi";
import {observer} from "mobx-react-lite";
import classes from "./ProductList.module.scss"
import FilterBar from "../FilterBar/FilterBar";

const ProductsList = observer(({slug}) => {
    const {product} = useContext(Context)
    useEffect(() => {
        fetchSubCategoriesOrProducts(slug, JSON.stringify(product.selectedBrands), product.page, product.limit, product.minPrice, product.maxPrice)
            .then(data => {
                product.setProducts(data.products.rows)
                product.setTotalCount(data.products.count)
            })
    }, [product.page, product.selectedBrands, product.minPrice, product.maxPrice])
    return (
        <div>
            <div className={classes.main}>
            <div className={classes.main__left}>
            {product.products.map(p =>
                <ProductItem product={p} key={p.id}/>
            )}
            </div>
                    <div className={classes.main__right}>
                        <FilterBar/>
                    </div>

            </div>
            <div className={classes.pagination}>
            <MyPagination/>
            </div>
        </div>
    );
});

export default ProductsList;