import LandingPage from "./Pages/LandingPage";
import Header from "./Components/Header/Header";
import BottomMenu from "./Components/BottomMenu/BottomMenu";
// import Slider from "./Utils/Slider";
import MobileAddMenu from "../src/Components/MobileAddMenu";

export default function App() {
  return (
    <>
      <Header />
      <LandingPage />
      {/* <Slider/> */}
      <BottomMenu />
      <MobileAddMenu />
    </>
  );
}
