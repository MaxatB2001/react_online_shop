import React, {useContext, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {fetchProduct} from "../../queries/ProductsApi";
import {Button, Col, Container, Nav, Row} from "react-bootstrap";
import ReviewList from "../../components/ReviewtList/ReviewList";
import {countAvgStars} from "../../utils/helpers";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {CART_ROUTE} from "../../utils/consts";

const ProductPage = observer(() => {
    const {product} = useContext(Context)
    const navigate = useNavigate()
    const {slug} = useParams()
    const [productOnPage, setProductOnPage] = useState({product_features: [], reviews: []})
    const {cart} = useContext(Context)
    const [selectedNav, setSelectedNav] = useState("features")
    const isProductInCart = cart.checkProductInCart(productOnPage)
    const addToCart = () => {
        const item = {
            product: productOnPage,
            quantity: 1,
        }
        cart.addToCart(item)
    }
    useEffect(() => {
        fetchProduct(slug).then(data => {
            setProductOnPage(data)
            product.addToWatchedRecently(data)
        })
    }, [])
    const starAvg = useMemo(() => countAvgStars(productOnPage.reviews), [productOnPage])
    return (
        <Container className="mt-4">
            <Row>
                <Col md={6}><img src={process.env.REACT_APP_API_URL + productOnPage.image} alt={"alt"}/></Col>
                <Col md={6}>
                    <h1>{productOnPage.name}</h1>
                    <i style={{color: "orange"}} className="bi bi-star-fill"></i>
                    <span style={{marginLeft: "5px"}}>{starAvg}</span>
                    <i style={{marginLeft: "15px"}} className="bi bi-chat"></i>
                    <span style={{marginLeft: "5px"}}>{productOnPage.reviews.length}</span>
                    <span style={{marginLeft: "12px"}}>Код товара: {productOnPage.id}</span>
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
                    {isProductInCart
                        ?
                        <Button onClick={() => navigate(CART_ROUTE)} variant={"outline-warning"}>Перейти в корзину</Button>
                        :
                        <Button style={{color: "white"}} onClick={() => addToCart()} size="lg" variant={"warning"}><span className="bi bi-cart-plus"></span> В корзину</Button>
                    }
                </Col>
            </Row>
            <Row className="mt-4">
                <Nav
                    justify variant="tabs" defaultActiveKey="features"
                    onSelect={(selectedKey => setSelectedNav(selectedKey))}
                >
                    <Nav.Item>
                        <Nav.Link eventKey="features">Характеристики</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="reviews">Отзывы</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="same">Похожие товары</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>
            <Row>
                {selectedNav === "features"
                    ?
                <div className="d-flex justify-content-center">
                    <div>
                    <h5 style={{fontWeight: 600}} className="mt-4">Основные характеристики {productOnPage.name}</h5>
                    <table>
                        <tbody>
                        {productOnPage.product_features.map(f =>
                        <tr key={f.id}>
                            <td>{f.title}</td>
                            <td><span style={{marginLeft: "100px"}}>{f.description}</span></td>
                        </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>
                    :
                    selectedNav === "reviews"
                    ?
                    <ReviewList productProp={productOnPage}/>
                    :
                    selectedNav === "same"
                    ?
                    <p>same</p>
                    :
                    ''
                }
            </Row>
        </Container>
    );
});

export default ProductPage;