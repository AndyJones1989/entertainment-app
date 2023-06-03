"use client"
import classes from './header.module.css';
import MenuSVG from '../../../../assets/menu';
import ProfileSVG from '../../../../assets/profile';
import ProfileAuthSVG from '../../../../assets/profile-logged-in';
import { useMediaQuery } from '../../../../utils/use-media-query';
import { sizes } from '../../../../utils/use-media-query';
import React, { useContext } from 'react';
import { AuthContext } from '@/app/context/auth-provider';
import Link from 'next/link';

export interface IHeaderProps {
    isLoggedIn: boolean
}


const Header = ({isLoggedIn}: IHeaderProps): JSX.Element => {
   const isMobile =  useMediaQuery(sizes.sm);
   const {authDetails} = useContext(AuthContext);
   
   console.log(authDetails);

    return(
        <nav className={classes.wrapper}>
            {isMobile && 
            <button className={classes.iconWrapper} >
            <MenuSVG/>
            </button>
            }
            
            {!isMobile &&
            <>
            <Link href='/landing' className={classes.headerElement}>Show Activities Near Me</Link>
            <p className={classes.headerElement}>Post an Activity</p>
            </>
            }
            <button className={classes.iconWrapper}>
            <p className={classes.headerElement}>{authDetails.isAuthenticated ? authDetails.userName : 'Profile'}</p>
            {authDetails.isAuthenticated ? <ProfileAuthSVG/> : <ProfileSVG/>}
            </button>
        </nav>
    )
}

export default Header;