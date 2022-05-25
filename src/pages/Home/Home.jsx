import React, {useContext, useEffect, useState} from 'react';
import {fetchLatestCategories, fetchPopularCategories} from "../../queries/ProductsApi";
import styles from './Home.module.scss'
import CategoryItem from "../../components/CategoryItem/CategoryItem";
import {Container} from "react-bootstrap";
import Slider from "../../components/Slider/Slider";
import {Context} from "../../index";


const Home = () => {
    const {product} = useContext(Context)
    const [showPopular, setShowPopular] = useState(true)
    const [popularCategories, setPopularCategories] = useState([])
    const [newCategories, setNewCategories] = useState([])
    const popularCategoriesStyles = [styles.popularCategoriesTab]
    const newCategoriesStyles = [styles.newCategoriesTab]
    if (showPopular) {
        popularCategoriesStyles.push(styles.active)
    } else {
        newCategoriesStyles.push(styles.active)
    }
    useEffect(() => {
        fetchPopularCategories().then(data => setPopularCategories(data))
        fetchLatestCategories().then(data => setNewCategories(data))
    }, [])
    return (
        <Container>
            <div className="d-flex">
                <div className={popularCategoriesStyles.join(' ')} onClick={() => setShowPopular(true)}>Популярные категории</div>
                <div className={styles.middle}>/</div>
                <div className={newCategoriesStyles.join(' ')} onClick={() => setShowPopular(false)}>Новые категории</div>
            </div>
            <div className={styles.gridWrapper}>
                {showPopular
                    ?
                    popularCategories.map(cat =>
                        <CategoryItem key={cat.id} category={cat.category}/>)
                    :
                        newCategories.map(cat =>
                            <CategoryItem key={cat.id} category={cat}/>
                )}
            </div>
            <div className="mt-5">
                <Slider products={product.watchedRecently}/>
            </div>
        </Container>
    );
};

export default Home;