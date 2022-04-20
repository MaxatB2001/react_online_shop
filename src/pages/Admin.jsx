import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/Modals/CreateBrand";
import CreateCategory from "../components/Modals/CreateCategory";
import CreateProduct from "../components/Modals/CreateProduct";

const Admin = () => {
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showBrandModal, setShowBrandModal] = useState(false)
    const [showProductModal, setShowProductModal] = useState(false)
    return (
        <Container className="d-flex flex-column">
            <h2 className="mt-4 d-flex justify-content-center">Панель администратора</h2>
            <Button size={"lg"} variant={"outline-warning"} className="mt-4" onClick={() => setShowCategoryModal(true)}>Добавить категорию</Button>
            <Button size={"lg"} variant={"outline-warning"} className="mt-4" onClick={() => setShowBrandModal(true)}>Добавить бренд</Button>
            <Button size={"lg"} variant={"outline-warning"} className="mt-4" onClick={() => setShowProductModal(true)}>Добавить товар</Button>
            <CreateBrand show={showBrandModal} onHide={() => setShowBrandModal(false)}/>
            <CreateCategory show={showCategoryModal} onHide={() => setShowCategoryModal(false)}/>
            <CreateProduct show={showProductModal} onHide={() => setShowProductModal(false)}/>
        </Container>
    );
};

export default Admin;