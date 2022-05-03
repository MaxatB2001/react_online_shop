import React from 'react';
import classes from './CategoryItem.module.scss'
import {Link} from "react-router-dom";
import {CATALOG_ROUTE} from "../../utils/consts";

const CategoryItem = ({category}) => {
    return (
        <div className={classes.categoryCard}>
            <div className={classes.categoryCard__hov}>
            <Link to={CATALOG_ROUTE + '/' + category.slug}>
            <img className={classes.categoryCard__image} src={process.env.REACT_APP_API_URL + '/' + category.image}/>
            <div className={classes.categoryCard__text}>
                <span>{category.title}</span> <span  className="bi bi-arrow-right"></span>
            </div>
            </Link>
            </div>
        </div>
    );
};

export default CategoryItem;