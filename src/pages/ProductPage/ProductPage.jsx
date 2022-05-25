import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {fetchComments, fetchProduct} from "../../queries/ProductsApi";
import classes from './ProductPage.module.scss'
import ReviewList from "../../components/ReviewtList/ReviewList";
import {countAvgStars} from "../../utils/helpers";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {CART_ROUTE} from "../../utils/consts";
import MyButton from "../../components/UI/Button/Button";
import NavBar from "../../components/NavBar/NavBar";
import AlikeProducts from "../../components/AlikeProducts/AlikeProducts";

const ProductPage = observer(() => {
    const {product} = useContext(Context)
    const navigate = useNavigate()
    const {slug} = useParams()
    const [productOnPage, setProductOnPage] = useState({product_features: [], reviews: []})
    const {cart} = useContext(Context)
    const [selectedNav, setSelectedNav] = useState("default")
    const isProductInCart = cart.checkProductInCart(productOnPage)
    const navTabs = [
        {
            value: 'default',
            content: 'О товаре'
        },
        {
            value: 'properties',
            content: 'Характеристики'
        },
        {
            value: 'reviews',
            content: `Отзывы ${product.reviews.length}`,
        },
        {
            value: 'alike',
            content: 'Похожие'
        },
    ]
    const addToCart = () => {
        const item = {
            product: productOnPage,
            quantity: 1,
        }
        cart.addToCart(item)
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchProduct(slug)
            console.log(data)
            setProductOnPage(data)
            product.addToWatchedRecently(data)
            const reviews = await fetchComments(data.id)
            product.setReviews(reviews)
        }
        fetchData()
    }, [])
    const starAvg = useMemo(() => countAvgStars(product.reviews), [product.reviews])
    return (
        <div className="Container">
            <div className={classes.top}>
                <div className={classes.left}>
                    <img src={process.env.REACT_APP_API_URL + productOnPage.image} alt={"alt"}/>
                </div>
                <div className={classes.right}>
                    <div className={classes.title}>
                        {productOnPage.name}
                    </div>
                    <div>
                        <i style={{color: "orange"}} className="bi bi-star-fill"></i>
                        <span style={{marginLeft: "5px"}}>{starAvg}</span>
                        <i style={{marginLeft: "15px"}} className="bi bi-chat"></i>
                        <span style={{marginLeft: "5px"}}>{product.reviews.length}</span>
                        <span style={{marginLeft: "12px"}}>Код товара: {productOnPage.id}</span>
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <span style={{fontWeight: '600', fontSize: "29px"}}>{productOnPage.price}</span>
                        <span style={{color: "#b3b3b7", fontSize: "29px", marginLeft: "5px"}}>₽</span>
                    </div>
                    {productOnPage.avaliable
                                        ?
                                        <p>В наличии</p>
                                        :
                                        <p>Нет в наличии</p>
                                    }
                                    <div className={classes.buttons}>
                                        <div className={classes.left_button}>
                                    {isProductInCart
                                        ?
                                        <MyButton onClick={() => navigate(CART_ROUTE)} size="lg">Перейти в корзину</MyButton>
                                        :
                                        <MyButton variant="default" onClick={() => addToCart()} size="lg"><span className="bi bi-cart-plus"></span> В корзину</MyButton>
                                    }
                                        </div>
                                    <button className={classes.right_button}>
                                        <i style={{fontSize: '19px'}} className="bi bi-bookmark"></i>
                                    </button>
                                    </div>
                </div>
            </div>
            <div className={classes.bottom}>
                <NavBar active={selectedNav} setActive={setSelectedNav} tabs={navTabs}/>
                <div className={classes.bottom__selections}>
                {selectedNav === 'reviews'
                    ?
                        <ReviewList productProp={productOnPage}/>
                    :
                        selectedNav === 'properties'
                    ?
                        <div className={classes.properties}>
                            <div className={classes.properties__title}>Основные характеристики {productOnPage.name}</div>
                            <div className={classes.properties__list}>
                                {productOnPage.product_features.map(f =>
                                    <div key={f.id} className={classes.properties__list__row}>
                                        <div className={classes.properties__list__row__left}>{f.title}</div>
                                        <div className={classes.properties__list__row__right}>{f.description}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    :
                        selectedNav === 'alike'
                    ?
                        <AlikeProducts product={productOnPage}/>
                    :
                            <div></div>
                }
                </div>
            </div>
        </div>
    );
});

export default ProductPage;