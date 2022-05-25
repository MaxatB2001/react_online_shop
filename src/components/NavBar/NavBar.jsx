import classes from './NavBar.module.scss';

const NavBar = ({active, setActive, tabs}) => {
    return (
        <div className={classes.navbar}>
            {tabs.map(tab =>
                <div key={tab.value} className={`${tab.value === active && classes.navbar__tab__active} ${classes.navbar__tab}`} onClick={() => setActive(tab.value)}>{tab.content}</div>
            )}
        </div>
    );
};

export default NavBar;