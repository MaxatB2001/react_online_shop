import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, FormControl, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createBrand, fetchAllCategories} from "../../queries/ProductsApi";

const CreateBrand = observer(({show, onHide}) => {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [file, setFile] = useState(null)
    const {product} = useContext(Context)

    useEffect(() => {
        fetchAllCategories().then(data => product.setAllCategories(data))
    }, [])

    const addBrand = () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('slug', slug)
        formData.append('image', file)
        formData.append('categoryId', product.selectedCategory.id)
        createBrand(formData).then(data => onHide())
        console.log(formData)
        product.setSelectedCategory({})
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавить брэнд</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl
                        value={title}
                        placeholder="Введите название"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <FormControl
                        value={slug}
                        placeholder="Введите уникальный идентификатор"
                        onChange={e => setSlug(e.target.value)}
                        className="mt-3"
                    />
                    <FormControl
                        type="file"
                        className="mt-3"
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button
                    onClick={() => addBrand()}
                    variant="warning"
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateBrand;