import Header from "./components/header/header"
import LandingHero from "./components/landing-hero/landing-hero";
import InfoCard from "./components/info-card/info-card";
import { landingInfoCardProps, LandingSupplierCardProps } from "../../copy-data/landing-page/copy-data";

export default function Home() {

  return (
  <>
  <Header isLoggedIn={false}/>
  <div style={{maxWidth: '1800px', margin: '0 auto'}}>
  <LandingHero/>
  <InfoCard {...landingInfoCardProps} />
  <InfoCard {...LandingSupplierCardProps} />
  </div>
  </>
  );
}