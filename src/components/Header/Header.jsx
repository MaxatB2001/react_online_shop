import React, {useContext} from 'react';
import user_icon from '../../assets/icons/user-svgrepo-com.svg'
import cart from '../../assets/icons/cart-svgrepo-com.svg'
import bookmark from '../../assets/icons/bookmark-svgrepo-com.svg'
import classes from './Header.module.scss'
import {Link, NavLink} from "react-router-dom";
import {Context} from "../../index";
import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {CART_ROUTE, HOME_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";

const Header = observer(() => {
    const {user} = useContext(Context)
    const {catalog} = useContext(Context)
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <NavLink to={HOME_ROUTE}>Navbar</NavLink>
                <Button onClick={() => catalog.setShowCatalog(!catalog.showCatalog)} variant="outline-warning">Каталог товаров</Button>
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Поиск по товарам"
                        className="me-2"
                        aria-label="Search"
                        style={{borderTop: "none", borderLeft: "none", borderRight: 'none', background: 'transparent', borderRadius:'0'}}
                    />
                    <Button variant="outline-warning">Найти</Button>
                </Form>
                <Nav className="ml-auto">
                    <div className={classes.headerLinks}>
                        <nav className={classes.navHeader}>
                            <ul className={classes.navHeader__list}>
                                <li className={classes.navHeader__link}>
                                    <Link className={classes.link} to={LOGIN_ROUTE}>
                                        <img style={{width: '20px', height: '20px'}} src={user_icon} alt="img"/>
                                        <div>Войти</div>
                                    </Link>
                                </li>
                                {user.isAuth && <li className={classes.navHeader__link}>
                                    <Link className={classes.link} to={CART_ROUTE}>
                                        <img style={{width: '20px', height: '20px'}} src={bookmark} alt="img"/>
                                        <div>Избранное</div>
                                    </Link>
                                </li>}
                                <li className={classes.navHeader__link}>
                                    <Link className={classes.link} to={CART_ROUTE}>
                                        <img style={{width: '20px', height: '20px'}} src={cart} alt="img"/>
                                        <div>Корзина</div>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
});

export default Header;