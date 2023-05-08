import Header from "./components/header/header"
import LandingHero from "./components/landing-hero/landing-hero";
import InfoCard from "./components/info-card/info-card";
import { landingInfoCardProps as data } from "../../copy-data/landing-page/copy-data";

export default function Home() {

  return (
  <>
  <Header isLoggedIn={false}/>
  <LandingHero/>
  <InfoCard title={data.title} body={data.body} image={data.image} imagePosition={data.imagePosition} altText={data.altText}/>
  </>
  );
}