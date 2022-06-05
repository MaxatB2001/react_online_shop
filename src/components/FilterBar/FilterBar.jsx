import classes from './FilterBar.module.scss';
import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {Context} from "../../index";

const FilterBar = observer(() => {
    const {product} = useContext(Context)
    const handleChange = (id) => {
        console.log(product.selectedBrands)
        if (!product.selectedBrands.includes(id)) {
            product.setSelectedBrands([...product.selectedBrands, id])
        } else {
            product.setSelectedBrands([...product.selectedBrands.filter(bId => bId !== id)])
        }
    }
    return (
        <div className={classes.sortBar}>
            <div className={classes.sortBar_wrapper}>
                <div className={classes.sortBar__top}>
                    <div className={classes.sortBar__top_left}>Фильтры</div>
                    <div className={classes.sortBar__top_right}>очистить</div>
                </div>
                <div className={classes.sortBar_price}>
                    <input onChange={e => product.setMinPrice(e.target.value)} value={product.minPrice} className={classes.sortBar_price__input} type="number"/>
                    <span className={classes.sortBar_price__dash}>-</span>
                    <input onChange={e => product.setMaxPrice(e.target.value)} value={product.maxPrice} className={classes.sortBar_price__input} type="number"/>
                </div>
                <div className={classes.sortBar_brands}>
                    {product.brands.map(b =>
                        <div className={classes.brandCheck}>
                            <label className={classes.check}>
                                <input
                                    type="checkbox"
                                    value={b.id}
                                    onChange={e => handleChange(Number(e.target.value))}
                                />
                                <span className={`bi bi-check ${classes.geekMark}`}></span>
                            </label>
                            <span>{b.title}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default FilterBar;