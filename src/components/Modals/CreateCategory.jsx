import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {createCategory, fetchAllCategories} from "../../queries/ProductsApi";
import {observer} from "mobx-react-lite";

const CreateCategory = observer(({show, onHide}) => {
    const {product} = useContext(Context)
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [icon, setIcon] = useState('')
    const [file, setFile] = useState(null)
    useEffect(() => {
        fetchAllCategories().then(data => product.setAllCategories(data))
    }, [])

    const addCategory = () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('slug', slug)
        formData.append('icon', icon)
        formData.append('image', file)
        if (product.selectedCategory.id) {
            formData.append('categoryId', product.selectedCategory.id)
        }
        createCategory(formData).then(data => onHide())
        product.setSelectedCategory({})
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Добавить категорию</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Введите название"
                    />
                    <Form.Control
                        value={slug}
                        onChange={e => setSlug(e.target.value)}
                        placeholder="Введите уникальный идентификатор"
                        className="mt-3"
                    />
                    <Form.Control
                        value={icon}
                        onChange={e => setIcon(e.target.value)}
                        placeholder="Иконка (не обязательное поле)"
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button
                    variant="warning"
                    onClick={() => addCategory()}
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateCategory;