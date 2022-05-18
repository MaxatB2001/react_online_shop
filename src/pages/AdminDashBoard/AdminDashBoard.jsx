import React, {useEffect, useState} from 'react';
import Chart from "../../components/Chart/Chart";
import {getOrderdsByMonth} from "../../queries/OrderApi";
import classes from './AdminDashBoard.module.scss'

const AdminDashBoard = () => {
    const [countedOrdersByMonth, setCountedOrdersByMonth] = useState([])
    useEffect(() => {
        getOrderdsByMonth().then(data => setCountedOrdersByMonth(data))
    }, [])
    return (
        <div className="Container">
            <div className={classes.stats_cards}>
                <div className={classes.stats_card}>
                    <div className={classes.stats_card__title}>
                        Продажи за последний месяц
                    </div>
                    <div className={classes.stats_card__price}>
                        Продажи за всё время
                    </div>
                </div>
                <div className={classes.stats_card}>
                    <div className={classes.stats_card__title}>
                        Продажи за последний месяц
                    </div>
                    <div className={classes.stats_card__price}>
                        Продажи за всё время
                    </div>
                </div>
                <div className={classes.stats_card}>
                    <div className={classes.stats_card__title}>
                        Продажи за последний месяц
                    </div>
                    <div className={classes.stats_card__price}>
                        Продажи за всё время
                    </div>
                </div>
            </div>
            <Chart title="Продажи за месяц" data={countedOrdersByMonth}/>
        </div>
    );
};

export default AdminDashBoard;