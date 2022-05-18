import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import image from '../../assets/IMG2634.jpg'
import {getUserOrders} from "../../queries/OrderApi";
import ClientOrderItem from "../../components/ClientOrderItem/ClientOrderItem";
import classes from './ProfilePage.module.scss'
import Admin from "../Admin";
import OrderList from "../../components/OrderList/OrderList";
import AdminDashBoard from "../AdminDashBoard/AdminDashBoard";
import {useNavigate} from "react-router-dom";
import {ADMIN_DASHBOARD_ROUTE} from "../../utils/consts";

const ProfilePage = () => {
    const {user} = useContext(Context)
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()
    const tabs = [
        {
          id: 0,
          title: 'Мой профиль',
          icon: 'bi bi-person-square',
          tabValue: 'profile',
        },
        {
            id: 1,
            title: 'Мои заказы',
            icon: 'bi bi-box2',
            tabValue: 'orders',
        },
        {
            id: 2,
            title: 'Избранное',
            icon: 'bi bi-bookmarks',
            tabValue: 'favorites',
        },
        {
            id: 3,
            title: 'Настройки профиля',
            icon: 'bi bi-gear',
            tabValue: 'profileSettings',
        },
        {
            id: 4,
            title: 'Панель администратора',
            icon: 'bi bi-person-check-fill',
            tabValue: 'admin',
        },
        {
            id: 5,
            title: 'Статистика',
            icon: 'bi bi-activity',
            tabValue: 'stats',
        }
    ]
    const [activeTab, setActiveTab] = useState(tabs[0])
    useEffect(() => {
        getUserOrders(user.user.id).then(data => setOrders(data))
    }, [])
    return (
        <>
            <h2>{activeTab.title}</h2>
        <div className={`${classes.profilePage} Container`}>
            <div className={classes.profilePage__sideBar}>
                <div className={classes.profilePage__sideBar__wrapper}>
                    <div className={classes.profilePage__sideBar__items}>
                        {tabs.map(t =>
                            <div onClick={() => setActiveTab(tabs[t.id])} className={classes.profilePage__sideBar__item}>
                                <i className={`${t.icon} ${classes.profilePage__sideBar__item__icon}`}></i>
                                <div className={classes.profilePage__sideBar__item__text}>{t.title}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={classes.profilePage__main}>
                <div className={classes.profilePage__main__wrapper}>
                        {activeTab.tabValue === 'profile' &&
                            <div className={classes.profilePage__main__myProfile}>
                                <div className={classes.profilePage__main__myProfile__info}>
                                    <div className={classes.profilePage__main__myProfile__info__wrapper}>
                                        <div className={classes.profilePage__main__myProfile__info__top}>
                                            <div className={classes.profilePage__main__myProfile__info__top__img}>
                                                <img src={image}/>
                                            </div>
                                            <div className={classes.profilePage__main__myProfile__info__top__name}>
                                                {user.user.email}
                                            </div>
                                        </div>
                                        <div className={classes.profilePage__main__myProfile__info__bot}>
                                            <div className={classes.profilePage__main__myProfile__info__bot__item}>
                                                <div className={classes.profilePage__main__myProfile__info__bot__label}>
                                            <span>
                                                email
                                            </span>
                                                </div>
                                                <div className={classes.profilePage__main__myProfile__info__bot__text}>
                                            <span>
                                                {user.user.email}
                                            </span>
                                                </div>
                                            </div>
                                            <div className={classes.profilePage__main__myProfile__info__bot__item}>
                                                <div className={classes.profilePage__main__myProfile__info__bot__label}>Телефон</div>
                                                <div>+7 (927) *** ** 54</div>
                                            </div>
                                            <div className={classes.profilePage__main__myProfile__info__bot__item}>
                                                <div className={classes.profilePage__main__myProfile__info__bot__label}>Город</div>
                                                <div>Казань</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.profilePage__main__myProfile__bonus}>

                                </div>
                            </div>
                        }
                        {activeTab.tabValue === 'admin' && <Admin/>}
                        {activeTab.tabValue === 'orders' && <OrderList orders={orders}/>}
                        {activeTab.tabValue === 'stats' ? navigate(ADMIN_DASHBOARD_ROUTE) : ''}
                    </div>
            </div>
        </div>
        </>
    );
};

export default ProfilePage;