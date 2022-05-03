import React, {useContext, useEffect} from 'react';
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
        fetchSubCategoriesOrProducts(slug, null, 1, 2)
            .then(data => {
                if (data.products) {
                    console.log(data.products)
                    product.setProducts(data.products.rows)
                    product.setTotalCount(data.products.count)
                    product.setCategories([])
                } else {
                    product.setCategories(data.subs)
                    product.setProducts([])
                }
            })
    }, [slug, product])
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