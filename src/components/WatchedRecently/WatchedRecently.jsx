import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import ProductSlider from "../ProductSlider";

const WatchedRecently = observer(() => {
    const {product} = useContext(Context)
    return (
        <div>
            <div>Вы недавно смотрели</div>
            <ProductSlider products={product.watchedRecently}/>
        </div>
    );
});

export default WatchedRecently;