import classes from './OrderList.module.scss'
import ClientOrderItem from "../ClientOrderItem/ClientOrderItem";

const OrderList = ({orders}) => {
    return (
        <div className={classes.orderList}>
            {orders.map(o =>
                <ClientOrderItem order={o}/>
            )}
        </div>
    );
};

export default OrderList;