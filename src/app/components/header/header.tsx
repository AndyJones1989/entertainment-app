import classes from './header.module.css';
import MenuSVG from '../../../../assets/menu';
import ProfileSVG from '../../../../assets/profile';

export interface IHeaderProps {
    isLoggedIn: boolean
}

 const Header = ({isLoggedIn}: IHeaderProps): JSX.Element => {
    return(
        <nav className={classes.wrapper}>
            <button className={classes.iconWrapper}>
            <MenuSVG/>
            </button>
            <p className={classes.headerElement}>Show Activities Near Me</p>
            <p className={classes.headerElement}>Post an Activity</p>
            
            <button className={classes.iconWrapper}>
            <p className={classes.headerElement}>Profile</p>
            <ProfileSVG/>
            </button>
        </nav>
    )
}

export default Header;