'use client'
import classes from './info-card.module.css'
import Image, { StaticImageData } from 'next/image'
import { useMediaQuery, sizes } from '../../../../utils/use-media-query';

export interface ICardProps {
    title: string;
    body: string;
    image: string | StaticImageData
    imagePosition: orientations;
    altText: string;
}

export enum orientations{
    up =1,
    right,
    down,
    left
}

const wrapperClasses = {
    1: 'imageTop',
    2: 'imageRight',
    3: 'imageBottom',
    4: 'imageLeft'
}

const boxClasses = {
    1: 'topAndBottom',
    2: 'leftAndRight',
    3: 'topAndBottom',
    4: 'leftAndRight',
}

const InfoCard = ({title, body, image, imagePosition, altText}: ICardProps): JSX.Element => {

const isMobile = useMediaQuery(sizes.sm);
const selectedWrapperClass = wrapperClasses[imagePosition];
const selectedBoxClass = boxClasses[imagePosition];

    return(
        <section className={`${classes[selectedWrapperClass]} ${classes.wrapper}`}>
            <div className={classes[selectedBoxClass]}>
                <p className={classes.title}>{title}</p>
                <p className={classes.body}>{body}</p>
            </div>
            {!isMobile && 
            <div className={classes[selectedBoxClass]}>
            <Image
            src={image}
            priority={true}
            style={{
                objectFit: 'cover',
                maxWidth: '100%',
                height: '100%',
                borderRadius: '10px'
            }}
            alt={altText}/>
            </div>
            }
        </section>
    )
}

export default InfoCard;