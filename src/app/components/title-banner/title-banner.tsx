import classes from './title-banner.module.css'

interface IBannerProps {
    text: string;
}

const TitleBanner = ({text}: IBannerProps): JSX.Element => {

    return(
        <div className ={classes.container}>
            <p className={classes.text}>{text}</p>
        </div>
    )
}

export default TitleBanner;