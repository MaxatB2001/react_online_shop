import React, {useContext, useEffect} from 'react';
import ProductPage from "./ProductPage/ProductPage";
import CategoryItem from "../components/CategoryItem/CategoryItem";
import {Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useParams} from "react-router-dom";
import {fetchSubCategoriesOrProducts} from "../queries/ProductsApi";
import CategoriesList from "../components/CategoriesList";
import ProductsList from "../components/ProductsList";

const Catalog = observer(() => {
    const {product} = useContext(Context)
    const {slug} = useParams()
    useEffect(() => {
        fetchSubCategoriesOrProducts(slug)
            .then(data => {
                if (data.products) {
                    product.setProducts(data.products)
                    product.setCategories([])
                } else {
                    product.setCategories(data.subs)
                    product.setProducts([])
                }
            })
    }, [slug])
    return (
        <Container>
            {product.categories.length > 0
                ?
                <CategoriesList/>
                :
                <ProductsList/>
            }
        </Container>
    );
});

export default Catalog;