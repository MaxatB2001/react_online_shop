import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createProduct, fetchAllCategories, fetchBrands} from "../../queries/ProductsApi";
import {observer} from "mobx-react-lite";

const CreateProduct = observer(({show, onHide}) => {
    const {product} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [slug, setSlug] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [avaliable, setAvaliable] = useState(false)
    const [file, setFile] = useState(null)
    const [feature, setFeature] = useState([])

    const addFeature = () => {
        setFeature([...feature, {title: '', description: '', num: Date.now()}])
    }

    const removeFeature = (num) => {
        setFeature(feature.filter(f => f.num !== num))
    }

    const changeFeature = (key, value, num) => {
        setFeature(feature.map(f => f.num === num ? {...f, [key]: value} : f))
    }

    useEffect(() => {
        fetchAllCategories().then(data => product.setAllCategories(data))
        fetchBrands().then(data => product.setBrands(data))
    }, [])

    const addProduct = () => {
        setAvaliable(true)
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('slug', slug)
        formData.append('quantity', quantity)
        formData.append('avaliable', avaliable)
        formData.append('image', file)
        formData.append('categoryId', product.selectedCategory.id)
        formData.append('brandId', product.selectedBrand.id)
        formData.append('feature', JSON.stringify(feature))
        createProduct(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавить товар</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Введите название"
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        placeholder="Введите стоимость устройства"
                        className="mt-3"
                    />
                    <Form.Control
                        value={slug}
                        onChange={e => setSlug(e.target.value)}
                        placeholder="Введите уникальный идентификатор"
                        className="mt-3"
                    />
                    <Form.Control
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))}
                        placeholder="Введите количество товара"
                        className="mt-3"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={e => setFile(e.target.files[0])}
                    />
                    <Dropdown className="mt-3">
                        <Dropdown.Toggle variant={"warning"}>{product.selectedCategory.title || 'Выберите категорию'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.allCategories.map(c =>
                                <Dropdown.Item
                                    key={c.id}
                                    onClick={() => product.setSelectedCategory(c)}
                                >
                                    {c.title}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-3">
                        <Dropdown.Toggle variant={"warning"}>{product.selectedBrand.title || 'Выберите брэнд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.brands.map(b =>
                                <Dropdown.Item
                                    key={b.id}
                                    onClick={() => product.setSelectedBrand(b)}
                                >
                                    {b.title}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <hr/>
                    <Button
                        onClick={() => addFeature()}
                        variant={"warning"}
                    >
                        Добавить характеристику
                    </Button>
                    {feature.map(f =>
                        <Row className="mt-3" key={f.num}>
                            <Col md={4}>
                                <Form.Control
                                    value={f.title}
                                    onChange={e => changeFeature('title', e.target.value, f.num)}
                                    placeholder="характеристика"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={f.description}
                                    onChange={e => changeFeature('description', e.target.value, f.num)}
                                    placeholder="описание"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant={"outline-danger"}
                                    onClick={() => removeFeature(f.num)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button
                    onClick={() => addProduct()}
                    variant="warning"
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;