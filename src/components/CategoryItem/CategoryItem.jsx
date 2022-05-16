import React from 'react';
import classes from './CategoryItem.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {CATALOG_ROUTE} from "../../utils/consts";

const CategoryItem = ({category}) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(CATALOG_ROUTE + '/' + category.slug)} className={classes.categoryItem}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.imageBox}>
                        <img className={classes.image} src={process.env.REACT_APP_API_URL + '/' + category.image}/>
                    </div>
                    <div className={classes.title}>
                        {category.title}<span  className="bi bi-arrow-right"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;