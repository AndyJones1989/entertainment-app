"use client";
import classes from "./info-card.module.css";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useMediaQuery, sizes } from "../../../../utils/use-media-query";

export interface ICardProps {
  title: string;
  body: string;
  linkText: string;
  linkUrl: string;
  image: string | StaticImageData;
  imagePosition: orientations;
  altText: string;
  colorReversed?: boolean;
}

export enum orientations {
  up = 1,
  right,
  down,
  left,
}

const wrapperClasses = {
  1: "imageTop",
  2: "imageRight",
  3: "imageBottom",
  4: "imageLeft",
};

const boxClasses = {
  1: "topAndBottom",
  2: "leftAndRight",
  3: "topAndBottom",
  4: "leftAndRight",
};

const InfoCard = ({
  title,
  body,
  linkText,
  linkUrl,
  image,
  imagePosition,
  altText,
  colorReversed,
}: ICardProps): JSX.Element => {
  const isMobile = useMediaQuery(sizes.sm);
  const selectedWrapperClass = wrapperClasses[imagePosition];
  const selectedBoxClass = boxClasses[imagePosition];
  const classByVariant = colorReversed
    ? classes.wrapperReversed
    : classes.wrapper;
  const textClassByVariant = colorReversed ? classes.reversedTextColor : "";

  return (
    <section className={`${classes[selectedWrapperClass]} ${classByVariant}`}>
      <div className={classes[selectedBoxClass]}>
        <p className={`${classes.title} ${textClassByVariant}`}>{title}</p>
        <p className={`${classes.body} ${textClassByVariant}`}>{body}</p>
        <Link
          href={linkUrl}
          className={`${classes.link} ${textClassByVariant}`}
        >
          {" "}
          {linkText}
        </Link>
      </div>
      {!isMobile && (
        <div className={classes[selectedBoxClass]}>
          <Image
            src={image}
            placeholder="blur"
            priority={true}
            style={{
              objectFit: "cover",
              maxWidth: "100%",
              height: "100%",
              borderRadius: "10px",
            }}
            alt={altText}
          />
        </div>
      )}
    </section>
  );
};

export default InfoCard;
