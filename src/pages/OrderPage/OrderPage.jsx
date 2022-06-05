import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchOrder} from "../../queries/OrderApi";
import classes from "./OrderPage.module.scss"
import OrderItemProduct from "../../components/OrderItemProduct/OrderItemProduct";

const OrderPage = () => {
    const {role} = useParams()
    const {id} = useParams()
    const [order, setOrder] = useState({createdAt: '', status: {}, order_items: []})
    useEffect(() => {
        fetchOrder(id).then(data => setOrder(data))
    }, [])
    return (
        <div className={`Container`}>
            <div className={classes.orderPage}>
                <h1 className={classes.title}>Заказ №{id}</h1>
                <span className={classes.status}>Статус: {order.status.value}</span>
                <span className={classes.status}>Создан: {order.createdAt.slice(0, 10)}</span>
                <div className={classes.info__title}>Информация о заказе и покупателе</div>
                <div className={classes.info}>
                    <div className={classes.info__left}>
                        <div className={classes.info__itemTitle}>Заказ</div>
                        <div>{id}</div>
                        <div>Статус: {order.status.value}</div>
                        <div>Создан: {order.createdAt.slice(0, 10)}</div>
                        <div className={classes.info__itemTitle}>Заказчик</div>
                        <div>{order.firstName} {order.lastName}</div>
                    </div>
                    <div className={classes.info__right}>
                        <div className={classes.info__itemTitle}>Телефон</div>
                        <div>{order.phone}</div>
                        <div className={classes.info__itemTitle}>Email</div>
                        <div>{order.email}</div>
                        <div className={classes.info__itemTitle}>Адрес доставки</div>
                        <div>{order.address}</div>
                    </div>
                </div>
                <hr className={classes.hr}/>
                <div className={classes.items__title}>Товары</div>
                <div className={classes.items__headers}>
                    <div className={classes.items__product}>Товары</div>
                    <div className={classes.items__space}></div>
                    <div className={classes.items__quantity}>Количество</div>
                    <div className={classes.items__price}>Цена</div>
                </div>
                {order.order_items.map((i, index) =>
                    <OrderItemProduct product={i} index={index} key={index}/>
                )}
                <div className={classes.total}>Итого</div>
                <div>{order.paidAmount}₽</div>
            </div>
        </div>
    );
};

export default OrderPage;