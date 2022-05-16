import classes from "./MyButton.module.scss"

const MyButton = ({children, size, ...props}) => {
    return (
        <button
            {...props}
            className={`${classes.button} ${classes[size]}`}
        >
            {children}
        </button>
    );
};

export default MyButton;