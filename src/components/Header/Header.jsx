import React, {useContext, useState} from 'react';
import user_icon from '../../assets/icons/user-svgrepo-com.svg'
import cart from '../../assets/icons/cart-svgrepo-com.svg'
import bookmark from '../../assets/icons/bookmark-svgrepo-com.svg'
import classes from './Header.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../../index";
import logo from "../../assets/faceit.svg"
import {CART_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, SEARCH_PAGE_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import MyButton from "../UI/Button/Button";

const   Header = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const {catalog} = useContext(Context)
    const [search, setSearch] = useState('')
    return (
        <div className={classes.header}>
            <div className={`${classes.wrapper} Container`}>
                <div onClick={() => navigate(HOME_ROUTE)} className={classes.logoWrapper}>
                    <img className={classes.logo} src={logo} alt="img"/>
                </div>
                <div className={classes.left}>
                    <MyButton onClick={() => catalog.setShowCatalog(!catalog.showCatalog)} size="m">
                        <i className={`bi bi-list-ul ${classes.buttonIcon}`}></i>
                        <span>Каталог товаров</span>
                    </MyButton>
                </div>
                <div className={classes.middle}>
                    <div className={classes.search}>
                        <input onChange={e => setSearch(e.target.value)} value={search} placeholder="Поиск по товарам" className={classes.search__input}/>
                        <i onClick={() => navigate(SEARCH_PAGE_ROUTE + `/${search}`)} className={`bi bi-search ${classes.search__icon}`}></i>
                    </div>
                </div>
                <div className={classes.right}>
                    <nav className={classes.navHeader}>
                        <ul className={classes.navHeader__list}>
                            {user.isAuth ? <li className={classes.navHeader__link}>
                                    <Link className={classes.link} to={PROFILE_ROUTE}>
                                        <img style={{width: '20px', height: '20px'}} src={user_icon} alt="img"/>
                                        <div>Профиль</div>
                                    </Link>
                                </li>
                                :
                                <li className={classes.navHeader__link}>
                                    <Link className={classes.link} to={LOGIN_ROUTE}>
                                        <img style={{width: '20px', height: '20px'}} src={user_icon} alt="img"/>
                                        <div>Войти</div>
                                    </Link>
                                </li>
                            }
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
            </div>
        </div>
        // <Navbar bg="light" variant="light">
        //     <Container>
        //         <NavLink style={{fontWeight: 600, fontSize: "20px"}} to={HOME_ROUTE}>Магазин</NavLink>
        //         <Button onClick={() => catalog.setShowCatalog(!catalog.showCatalog)} variant="outline-warning">Каталог товаров</Button>
        //         <Form className="d-flex">
        //             <FormControl
        //                 type="search"
        //                 placeholder="Поиск по товарам"
        //                 className="me-2"
        //                 aria-label="Search"
        //                 style={{borderTop: "none", borderLeft: "none", borderRight: 'none', background: 'transparent', borderRadius:'0'}}
        //             />
        //             <Button variant="outline-warning">Найти</Button>
        //         </Form>
        //         <Nav className="ml-auto">
        //             <div className={classes.headerLinks}>
        //                 <nav className={classes.navHeader}>
        //                     <ul className={classes.navHeader__list}>
        //                         {user.isAuth ? <li className={classes.navHeader__link}>
        //                             <Link className={classes.link} to={PROFILE_ROUTE}>
        //                                 <img style={{width: '20px', height: '20px'}} src={user_icon} alt="img"/>
        //                                 <div>Профиль</div>
        //                             </Link>
        //                         </li>
        //                         :
        //                             <li className={classes.navHeader__link}>
        //                                 <Link className={classes.link} to={LOGIN_ROUTE}>
        //                                     <img style={{width: '20px', height: '20px'}} src={user_icon} alt="img"/>
        //                                     <div>Войти</div>
        //                                 </Link>
        //                             </li>
        //                         }
        //                         {user.isAuth && <li className={classes.navHeader__link}>
        //                             <Link className={classes.link} to={CART_ROUTE}>
        //                                 <img style={{width: '20px', height: '20px'}} src={bookmark} alt="img"/>
        //                                 <div>Избранное</div>
        //                             </Link>
        //                         </li>}
        //                         <li className={classes.navHeader__link}>
        //                             <Link className={classes.link} to={CART_ROUTE}>
        //                                 <img style={{width: '20px', height: '20px'}} src={cart} alt="img"/>
        //                                 <div>Корзина</div>
        //                             </Link>
        //                         </li>
        //                     </ul>
        //                 </nav>
        //             </div>
        //         </Nav>
        //     </Container>
        // </Navbar>
    );
});

export default Header;