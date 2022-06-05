import React, {useMemo} from 'react';
import img from '../../assets/acernitro_5.png'
import styles from './VerticalProductCard.module.scss'
import {countAvgStars} from "../../utils/helpers";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../utils/consts";

const VerticalProductCard = ({product}) => {
    console.log(product)
    const starAvg = useMemo(() => countAvgStars(product.reviews), [product])
    const navigate = useNavigate()
    return (
        <div className={styles.wrapper}>
            <div className={styles.item}>
                <div className={styles.image__wrapper}>
                    <img className={styles.image} src={process.env.REACT_APP_API_URL + product.image}/>
                </div>
                <div className={styles.rate}>
                    <i style={{color: "orange"}} className="bi bi-star-fill"></i>
                    <span style={{marginLeft: "5px"}}>{starAvg}</span>
                    <div>
                    <i style={{marginLeft: "15px"}} className="bi bi-chat"></i>
                    <span style={{marginLeft: "5px"}}>{product.reviews.length} отзывов</span>
                    </div>
                </div>
                <div onClick={() => navigate(PRODUCT_ROUTE + '/' + product.slug)} className={styles.name}>
                    {product.name}
                </div>
                <div className={styles.price}>
                    {product.price} ₽
                </div>
                <div className={styles.buttons}>
                    <Button style={{color: 'white'}} variant='warning'>В корзину</Button>
                        <div className={styles.bookmark}>
                            <i className="bi bi-bookmark"></i>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default VerticalProductCard;