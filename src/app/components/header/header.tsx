import classes from './header.module.css';
import MenuSVG from '../../../../assets/menu';

export interface IHeaderProps {
    isLoggedIn: boolean
}

 const Header = ({isLoggedIn}: IHeaderProps): JSX.Element => {
    return(
        <nav className={classes.wrapper}>
            <button className={classes.iconWrapper}>
            <MenuSVG/>
            </button>
        </nav>
    )
}

export default Header;