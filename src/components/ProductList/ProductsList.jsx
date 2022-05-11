import React, {useContext, useEffect} from 'react';
import {Context} from "../../index";
import ProductItem from "../ProductItem/ProductItem";
import MyPagination from "../MyPagination";
import {fetchSubCategoriesOrProducts} from "../../queries/ProductsApi";
import {observer} from "mobx-react-lite";
import classes from "./ProductList.module.scss"

const ProductsList = observer(({slug}) => {
    const {product} = useContext(Context)
    useEffect(() => {
        fetchSubCategoriesOrProducts(slug, product.selectedBrand.id, product.page, 2)
            .then(data => {
                product.setProducts(data.products.rows)
                product.setTotalCount(data.products.count)
            })
    }, [product.page, product.selectedBrand,])
    return (
        <div>
            <div className={classes.main}>
            <div className={classes.main__left}>
            {product.products.map(p =>
                <ProductItem product={p} key={p.id}/>
            )}
            </div>
                    <div className={classes.main__right}>
                        <div className={classes.main__right_wrapper}>
                            <div className={classes.main__right__top}>
                                <div className={classes.main__right__top_left}>Фильтры</div>
                                <div className={classes.main__right__top_right}>очистить</div>
                            </div>
                        </div>
                    </div>

            </div>
            <MyPagination/>
        </div>
    );
});

export default ProductsList;