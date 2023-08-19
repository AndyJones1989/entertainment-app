"use client";
import classes from "./header.module.css";
import MenuSVG from "../../../../assets/menu";
import ProfileSVG from "../../../../assets/profile";
import ProfileAuthSVG from "../../../../assets/profile-logged-in";
import { useMediaQuery } from "../../../../utils/use-media-query";
import { sizes } from "../../../../utils/use-media-query";
import { useState } from "react";
import Link from "next/link";
import { HydrationProvider, Client } from "react-hydration-provider";
import HomeSvg from "../../../../assets/home";

const Header = (): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);
  const isMobile = useMediaQuery(sizes.sm);
  let email;
  if (typeof window !== "undefined") {
    email = window.localStorage.getItem("user");
  }

  const displayName = email?.split("@")[0];

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <HydrationProvider>
      <Client>
        <nav className={classes.wrapper}>
          {isMobile && (
            <>
              <button className={classes.iconWrapper} onClick={handleMenuClick}>
                <MenuSVG />
              </button>
              <ul className={showMenu ? classes.showMenu : classes.hideMenu}>
                <Link href="/" className={classes.burgerElement}>
                  Home
                </Link>
                <Link href="/landing" className={classes.burgerElement}>
                  Show Activities Near Me
                </Link>
                <Link href="/post-event" className={classes.burgerElement}>
                  Post an Activity
                </Link>
                <Link href="/login" className={classes.burgerElement}>
                  Account
                </Link>
                <button
                  className={classes.burgerClose}
                  onClick={handleMenuClick}
                >
                  Close
                </button>
              </ul>
            </>
          )}

          {!isMobile && (
            <>
              <HomeSvg />
              <Link href="/landing" className={classes.headerElement}>
                Show Activities Near Me
              </Link>
              <Link href="/post-event" className={classes.headerElement}>
                Post an Activity
              </Link>
            </>
          )}
          <button className={classes.iconWrapper}>
            <Link className={classes.headerElement} href="/login">
              {displayName ? displayName : "Profile"}
            </Link>
            {email ? <ProfileAuthSVG /> : <ProfileSVG />}
          </button>
        </nav>
      </Client>
    </HydrationProvider>
  );
};

export default Header;
