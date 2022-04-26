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
    console.log('re')
    const navigate = useNavigate()
    const [product, setProduct] = useState({product_features: [], reviews: []})
    const {cart} = useContext(Context)
    const [selectedNav, setSelectedNav] = useState("features")
    const {slug} = useParams()
    const isProductInCart = cart.checkProductInCart(product)
    const addToCart = () => {
        const item = {
            product,
            quantity: 1,
        }
        cart.addToCart(item)
    }
    useEffect(() => {
        fetchProduct(slug).then(data => {
            setProduct(data)
        })
    }, [])
    const starAvg = useMemo(() => countAvgStars(product.reviews), [product])
    return (
        <Container className="mt-4">
            <Row>
                <Col md={6}><img src={process.env.REACT_APP_API_URL + product.image} alt={"alt"}/></Col>
                <Col md={6}>
                    <h1>{product.name}</h1>
                    <i style={{color: "orange"}} className="bi bi-star-fill"></i>
                    <span style={{marginLeft: "5px"}}>{starAvg.toFixed(2)}</span>
                    <i style={{marginLeft: "15px"}} className="bi bi-chat"></i>
                    <span style={{marginLeft: "5px"}}>{product.reviews.length}</span>
                    <span style={{marginLeft: "12px"}}>Код товара: {product.id}</span>
                    <div style={{marginTop: "10px"}}>
                        <span style={{fontWeight: '600', fontSize: "29px"}}>{product.price}</span>
                        <span style={{color: "#b3b3b7", fontSize: "29px", marginLeft: "5px"}}>₽</span>
                    </div>
                    {product.avaliable
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
                    <h5 style={{fontWeight: 600}} className="mt-4">Основные характеристики {product.name}</h5>
                    <table>
                        <tbody>
                        {product.product_features.map(f =>
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
                    <ReviewList productProp={product}/>
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