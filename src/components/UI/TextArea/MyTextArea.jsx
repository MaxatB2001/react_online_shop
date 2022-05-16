import classes from "./MyTextArea.module.scss"

const MyTextArea = ({...props}) => {
    return (
        <textarea {...props} className={classes.myTextArea}/>
    );
};

export default MyTextArea;