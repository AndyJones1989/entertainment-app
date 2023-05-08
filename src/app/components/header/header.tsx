"use client"
import classes from './header.module.css';
import MenuSVG from '../../../../assets/menu';
import ProfileSVG from '../../../../assets/profile';
import { useMediaQuery } from '../../../../utils/use-media-query';
import { sizes } from '../../../../utils/use-media-query';
import React from 'react';

export interface IHeaderProps {
    isLoggedIn: boolean
}


const Header = ({isLoggedIn}: IHeaderProps): JSX.Element => {
   let isMobile =  useMediaQuery(sizes.sm);

    return(
        <nav className={classes.wrapper}>
            {isMobile && 
            <button className={classes.iconWrapper} >
            <MenuSVG/>
            </button>
            }
            
            {!isMobile &&
            <>
            <p className={classes.headerElement}>Show Activities Near Me</p>
            <p className={classes.headerElement}>Post an Activity</p>
            </>
            }
            <button className={classes.iconWrapper}>
            <p className={classes.headerElement}>Profile</p>
            <ProfileSVG/>
            </button>
        </nav>
    )
}

export default Header;