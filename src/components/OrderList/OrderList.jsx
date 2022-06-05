import classes from './OrderList.module.scss'
import ClientOrderItem from "../ClientOrderItem/ClientOrderItem";

const OrderList = ({orders, role='user'}) => {
    return (
        <div className={classes.orderList}>
            {orders.map(o =>
                <ClientOrderItem role={role} key={o.id} order={o}/>
            )}
        </div>
    );
};

export default OrderList;