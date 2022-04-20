import React, {useContext, useState} from 'react';
import classes from './CatalogModal.module.scss'
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {ListGroup} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {CATALOG_ROUTE, LOGIN_ROUTE} from "../../../utils/consts";

const CatalogModal = observer(() => {
    const {catalog} = useContext(Context)
    const {product} = useContext(Context)
    const navigate = useNavigate()
    const [showSubModal, setShowSubModal] = useState(false)
    const [activeCategory, setActiveCategory] = useState(null)
    return (
        catalog.showCatalog && <div onClick={() => catalog.setShowCatalog(!catalog.showCatalog)} className={classes.dialog}>
            <div className={classes.dialog__content}>
                <h2 className="d-flex justify-content-center">Каталог</h2>
                <ListGroup variant="flush">
                {product.parentCategories.map(c =>
                    <ListGroup.Item
                        onClick={() => navigate(CATALOG_ROUTE + '/' + c.slug)}
                        style={{backgroundColor: 'transparent', cursor: "pointer"}}
                        onMouseOver={() => {
                            setActiveCategory(c)
                            setShowSubModal(true)
                        }}
                        key={c.id}
                    >
                        <div className={classes.dialog__content__item}>
                            <span style={{marginRight: "10px"}}><i className={c.icon}></i></span>
                            {c.title}
                        </div>
                    </ListGroup.Item>
                )}
                </ListGroup>
            </div>
            {showSubModal && <div className={classes.dialog__content__sub}>
                <ListGroup style={{marginTop: "46px"}} variant="flush">
                    {activeCategory.subCategories.map(category =>
                        <ListGroup.Item
                            onClick={() => navigate(CATALOG_ROUTE + '/' + category.slug)}
                            style={{backgroundColor: 'transparent', cursor: "pointer"}}
                            key={category.id}
                        >
                            <div className={classes.dialog__content__item}>
                                {category.title}
                            </div>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>}
        </div>
    );
});

export default CatalogModal;