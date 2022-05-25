import classes from "./MyButton.module.scss"

const MyButton = ({children, size, variant,  ...props}) => {
    return (
        <button
            {...props}
            className={`${classes.button} ${classes[size]} ${classes[variant]}`}
        >
            {children}
        </button>
    );
};

export default MyButton;