import classes from './activity-card.module.css'
import Image from 'next/image';

export interface IActivityCardProps {
    title: string;
    imageRef?: any;
    distance: number;
    description: string;
    contact: string;
    priority?: boolean;
}

const ActivityCard = ({title, imageRef, distance, description, contact, priority} :(IActivityCardProps)):JSX.Element => {
    return(
        <div className={classes.container}>
            <p className={classes.title}>{title}</p>
            {imageRef && 
            <div className={classes.imageContainer}>
                <Image style={{objectFit: 'scale-down'}} src={imageRef} alt={title + ' Image'} priority={priority} placeholder={priority ? 'empty' : 'blur'} blurDataURL='data:image/webp;base64,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'/>
            </div>
            }
            <div className={classes.detailsWrapper}>
                <p className={classes.descriptionItem}>{description}</p>
                <p className={classes.descriptionItem}>{'Contact: ' + contact}</p>
                <p className={classes.descriptionItem}>{distance.toFixed(2) + ' KM'}</p>
            </div>
        </div>
    )
}

export default ActivityCard;