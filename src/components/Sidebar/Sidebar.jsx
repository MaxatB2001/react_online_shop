import React from 'react';
import classes from './Sidebar.module.scss'
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className={classes.side}>
            <nav className={classes.menu}>
                <div className={classes.menu__header}>
                    <div className={classes.meny__title}>Каталог товаров</div>
                    <div className={classes.menu__burger}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={classes.menu__body}>
                    <ul className={classes.menu__list}>
                        <li><Link to='#'></Link></li>
                        <li><Link to='#'></Link></li>
                        <li><Link to='#'></Link></li>
                    </ul>
                </div>
                <div className={classes.menu__submenu}></div>
            </nav>
        </aside>
    );
};

export default Sidebar;