import React, {useEffect, useState} from 'react';
import Chart from "../../components/Chart/Chart";
import {getOrderdsByMonth, getProductOrdersMonthCount, getSumOrders} from "../../queries/OrderApi";
import classes from './AdminDashBoard.module.scss'

const AdminDashBoard = () => {
    const [countedOrdersByMonth, setCountedOrdersByMonth] = useState([])
    const [monthOrdersCount, setMonthOrdersCount] = useState(0)
    const [sumOrders, setSumOrders] = useState(null)
    const [productOrdersByMonth, setProductOrdersByMonth] = useState(0)
    useEffect(() => {
        getOrderdsByMonth().then(data => {
            setCountedOrdersByMonth(data.sorted)
            setMonthOrdersCount(data.count)
        })
        getSumOrders().then(data => setSumOrders(data))
        getProductOrdersMonthCount().then(data => setProductOrdersByMonth(data))
    }, [])
    return (
        <div className="Container">
            <div className={classes.stats_cards}>
                <div className={classes.stats_card}>
                    <div className={classes.stats_card__title}>
                        Продаж за последний месяц
                    </div>
                    <div className={classes.stats_card__price}>
                        {sumOrders}
                    </div>
                </div>
                <div className={classes.stats_card}>
                    <div className={classes.stats_card__title}>
                        Заказов за последний месяц
                    </div>
                    <div className={classes.stats_card__price}>
                        {monthOrdersCount}
                    </div>
                </div>
                <div className={classes.stats_card}>
                    <div className={classes.stats_card__title}>
                        Товаров продано за месяц
                    </div>
                    <div className={classes.stats_card__price}>
                        {productOrdersByMonth}
                    </div>
                </div>
            </div>
            <Chart title="Продажи за месяц" data={countedOrdersByMonth}/>
        </div>
    );
};

export default AdminDashBoard;