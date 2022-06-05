import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useParams} from "react-router-dom";
import {fetchSubCategoriesOrProducts} from "../queries/ProductsApi";
import CategoriesList from "../components/CategoriesList";
import ProductsList from "../components/ProductList/ProductsList";

const Catalog = observer(() => {
    const {product} = useContext(Context)
    const {slug} = useParams()
    useEffect(() => {
        fetchSubCategoriesOrProducts(slug, JSON.stringify([]), product.page, product.limit, product.minPrice, product.maxPrice)
            .then(data => {
                console.log(data)
                if (data.products) {
                    product.setCategories([])
                    product.setProducts(data.products.rows)
                    product.setTotalCount(data.products.count)
                    product.setMaxPrice(data.products.maxPrice.max)
                    product.setMinPrice(data.products.minPrice.min)
                    product.setBrands(data.category.brands)
                } else {
                    product.setProducts([])
                    product.setCategories(data.subs)
                }
            })
    }, [slug])
    return (
        <Container>
            {product.categories.length > 0
                ?
                <CategoriesList/>
                :
                <ProductsList slug={slug}/>
            }
        </Container>
    );
});

export default Catalog;