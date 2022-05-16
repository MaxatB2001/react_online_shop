import classes from "./MyModal.module.scss"
import {observer} from "mobx-react-lite";

const MyModal = observer(({children, showModal, setShowModal, title}) => {
    const rootClasses = [classes.myModal]

    if (showModal) {
        rootClasses.push(classes.active)
    }

    return (
        <div onClick={() => setShowModal(false)} className={rootClasses.join(' ')}>
           <div onClick={e => e.stopPropagation()} className={classes.myModal__content}>
               <div className={classes.title}>{title}</div>
               <div className={classes.body}>
                   {children}
               </div>
           </div>
        </div>
    );
});

export default MyModal;