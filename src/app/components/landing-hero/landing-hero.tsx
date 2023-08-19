"use client";
import classes from "./landing-hero.module.css";
import nursery from "../../../../assets/nursery.webp";
import playground from "../../../../assets/playground.webp";
import welcome from "../../../../assets/welcome-image.webp";
import Image from "next/image";
import { useMediaQuery, sizes } from "../../../../utils/use-media-query";

export const LandingHero = (): JSX.Element => {
  const imageStyle = {
    borderRadius: "5%",
    padding: "10px",
  };

  const isTabletDown = useMediaQuery(sizes.md);

  return (
    <section className={classes.wrapper}>
      {!isTabletDown && (
        <>
          <Image
            className={classes.gridImage1}
            src={nursery}
            alt="A nursery class"
            priority={true}
            width={500}
            style={imageStyle}
          ></Image>
          <Image
            className={classes.gridImage2}
            src={playground}
            alt="An outdoor play area"
            priority={true}
            width={500}
            style={imageStyle}
          ></Image>
        </>
      )}
      <div className={classes.titleBanner}>
        Find Your Next Adventure
        <br />
        <Image
          src={welcome}
          alt="Happy kids with a welcome sign"
          priority={true}
          width={200}
          style={{
            margin: "30px",
            alignSelf: "end",
          }}
        ></Image>
      </div>
    </section>
  );
};

export default LandingHero;
