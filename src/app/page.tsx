import Header from "./components/header/header"
import LandingHero from "./components/landing-hero/landing-hero";

export default function Home() {

  return (
  <>
  <Header isLoggedIn={false}/>
  <LandingHero/>
  </>
  );
}