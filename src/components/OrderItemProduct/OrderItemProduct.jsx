import classes from "./OrderItemProduct.module.scss"

const OrderItemProduct = ({product, index}) => {
    return (
        <div className={classes.orderItemProduct}>
            <div>{index + 1}</div>
            <div className={classes.imageContainer}>
                <img className={classes.image} src={process.env.REACT_APP_API_URL + '/' + product.product.image} alt="jees"/>
            </div>
            <div className={classes.title}>
                <div className={classes.name}>{product.product.name}</div>
                <div className={classes.id}>ID: {product.product.id}</div>
            </div>
            <div className={classes.quantity}>{product.quantity}</div>
            <div className={classes.price}>{product.product.price}₽</div>
        </div>
    );
};

export default OrderItemProduct;