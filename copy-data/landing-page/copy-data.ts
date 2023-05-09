import { ICardProps } from "@/app/components/info-card/info-card";
import collage from '../../assets/collage.webp'
import nurseryTeacher from '../../assets/nurseryTeacher.webp'

export const landingInfoCardProps: ICardProps = {
    title: 'How it Works',
    body: "We provide parents with a one-stop shop for finding events, classes and other entertainment close to you. You can sort by distance, category, cost and date to find that perfect entertainment for your little treasure! Struggling for something to do on a rainy day? No problem! We'll find you a great day at an indoor venue in seconds. ",
    linkText: 'Click here and start looking',
    linkUrl: '/landing',
    image: collage,
    imagePosition: 2,
    altText: 'Child making a collage',
    colorReversed: false
}

export const LandingSupplierCardProps: ICardProps = {
    title: 'Run a Class or Activity?',
    body: "We'd love to get your event listed! Our sign-up process is so very easy, you could be appearing in searches in just a few clicks. We base our pricing on how many sign-ups you get through us, so if you're not getting new business, you don't pay a thing. That means your success is key to our success!",
    linkText: "Let's Get Started",
    linkUrl: '/login',
    image: nurseryTeacher,
    imagePosition: 4,
    altText: 'Happy nursery teacher',
    colorReversed: true
}