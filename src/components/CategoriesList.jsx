import React, {useContext} from 'react';
import {Context} from "../index";
import CategoryItem from "./CategoryItem/CategoryItem";

const CategoriesList = () => {
    const {product} = useContext(Context)
    return (
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
            {product.categories.map(c =>
                <CategoryItem category={c} key={c.id}/>
            )}
        </div>
    );
};

export default CategoriesList;