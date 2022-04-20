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
                <ListGroup variant="flush">
                {product.parentCategories.map(c =>
                    <ListGroup.Item
                        onClick={() => navigate(CATALOG_ROUTE + '/' + c.slug)}
                        style={{backgroundColor: 'transparent'}}
                        onMouseOver={() => {
                            setActiveCategory(c)
                            setShowSubModal(true)
                        }}
                        key={c.id}
                    >
                            {c.title}
                    </ListGroup.Item>
                )}
                </ListGroup>
            </div>
            {showSubModal && <div className={classes.dialog__content__sub}>
                {activeCategory.subCategories.map(category =>
                    <div key={category.id}>{category.title}</div>
                )}
            </div>}
        </div>
    );
});

export default CatalogModal;