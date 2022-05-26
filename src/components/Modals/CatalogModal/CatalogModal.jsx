import React, {useContext, useState} from 'react';
import classes from './CatalogModal.module.scss'
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {ListGroup} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {CATALOG_ROUTE, LOGIN_ROUTE} from "../../../utils/consts";

const CatalogModal = observer(() => {
    const {catalog} = useContext(Context)
    const {product} = useContext(Context)
    const navigate = useNavigate()
    const [showSubModal, setShowSubModal] = useState(false)
    const [activeCategory, setActiveCategory] = useState({id: null})
    return (
        catalog.showCatalog && <div onClick={() => catalog.setShowCatalog(!catalog.showCatalog)} className={classes.dialog}>
            <div className={classes.dialog__content}>
                <div className={classes.dialog__content__title}>Каталог</div>
                <div className={classes.parentCategories__list}>
                    {product.parentCategories.map(c =>
                        <div
                            key={c.id}
                            className={`${classes.parentCategories__item} ${activeCategory.id === c.id ? classes.parentCategories__item_active : ''}`}
                                    onMouseOver={() => {
                                        setActiveCategory(c)
                                        setShowSubModal(true)
                                    }}
                            onClick={() => navigate(CATALOG_ROUTE + '/' + c.slug)}
                        >
                            <i className={`${c.icon} ${classes.parentCategories__item_icon}`}></i>
                            <span>{c.title}</span>
                        </div>
                    )}
                </div>
            </div>
            {showSubModal && <div className={classes.dialog__content__sub}>
                <div className={classes.subCategories__title}>{activeCategory.title}</div>
                <div className={classes.subCategories__list}>
                    {activeCategory.subCategories.map(s =>
                        <div key={s.id} className={classes.subCategories__item}>
                            <div
                                className={classes.subCategories__item_title}
                                onClick={() => navigate(CATALOG_ROUTE + '/' + s.slug)}
                            >
                                {s.title}
                            </div>
                            <div className={classes.subCategories__item__subCategories_list}>
                                {s.subCategories.map(ss =>
                                    <div
                                        key={ss.id}
                                        className={classes.subCategories__item__subCategories_item}
                                        onClick={() => navigate(CATALOG_ROUTE + '/' + ss.slug)}
                                    >
                                        {ss.title}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>}
        </div>
    );
});

export default CatalogModal;