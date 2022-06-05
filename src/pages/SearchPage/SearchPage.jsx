import classes from "./SearchPage.module.scss"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {searchProducts} from "../../queries/ProductsApi";
import VerticalProductCard from "../../components/VerticalProductCard/VerticalProductCard";
import FilterBar from "../../components/FilterBar/FilterBar";

const SearchPage = () => {
    const { query } = useParams()
    const [products, serProducts] = useState([])
    useEffect(() => {
        searchProducts(query).then(data => serProducts(data))
    }, [query])
    return (
        <div className="Container">
            <h1 className={classes.title}>Результаты для {`«${query}»`}</h1>
            <div className={classes.search}>
                <div className={classes.search__left}>
                    {products.map(p =>
                        <VerticalProductCard key={p.id} product={p}/>
                    )}
                </div>
                <div className={classes.search__right}>
                    <FilterBar/>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;