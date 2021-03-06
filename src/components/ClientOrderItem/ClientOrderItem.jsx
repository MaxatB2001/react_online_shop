import classes from './ClientOrderItem.module.scss'
import {useNavigate} from "react-router-dom";
import {ORDER_PAGE_ROUTE} from "../../utils/consts";

const ClientOrderItem = ({order, role}) => {
    const navigate = useNavigate()
    return (
        <div className={classes.orderItem}>
            <div className={classes.orderItem__top}>
                <div className={classes.orderItem__top__status}>
                    <span>{order.status.value}</span>
                </div>
                <div className={classes.orderItem__top__id}>
                    <div>Заказ №:</div>
                    <div>{order.id}</div>
                </div>
                <div className={classes.orderItem__top__date}>
                    <div>Дата заказа</div>
                    <div>{order.createdAt.slice(0, 10)}</div>
                </div>
            </div>
            <div className={classes.orderItem__bot}>
                <div className={classes.orderItem__bot__left}>
                    {order.order_items.slice(0,3).map(item =>
                        <div key={item.id} className={classes.orderItem__bot__left__img}>
                            <img src={process.env.REACT_APP_API_URL + item.product.image}/>
                        </div>
                    )}
                </div>
                <div className={classes.orderItem__bot__right}>
                    <button onClick={() => navigate(ORDER_PAGE_ROUTE + '/' + role + '/' + order.id)} className={classes.orderItem__bot__right__button}>Посмотреть заказ</button>
                </div>
            </div>
        </div>
    );
};

export default ClientOrderItem;