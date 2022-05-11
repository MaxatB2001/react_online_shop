import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import ProductSlider from "../ProductSlider";
import classes from "./WatchedRecently.module.scss"

const WatchedRecently = observer(() => {
    const {product} = useContext(Context)
    return (
        <div className={classes.watchedRecently}>
            <div className={classes.title}>Вы недавно смотрели</div>
            <ProductSlider products={product.watchedRecently}/>
        </div>
    );
});

export default WatchedRecently;