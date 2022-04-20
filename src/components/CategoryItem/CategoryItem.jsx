import React from 'react';
import classes from './CategoryItem.module.scss'
import {Link} from "react-router-dom";
import {CATALOG_ROUTE} from "../../utils/consts";

const CategoryItem = ({category}) => {
    return (
        <div className={classes.category_card}>
            <Link to={CATALOG_ROUTE + '/' + category.slug}>
            <img className={classes.category_card__image} src={process.env.REACT_APP_API_URL + '/' + category.image}/>
            <div>
                <p>{category.title}</p>
            </div>
            </Link>
        </div>
    );
};

export default CategoryItem;