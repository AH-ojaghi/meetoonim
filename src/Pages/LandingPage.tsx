import PageInformation from "../components/PageInformation/PageInformation";
import Content from "../components/Content/Content";
import AdvertisingCard from "../components/AdvertisingCard/AdvertisingCard";
import BottomMenu from "../components/BottomMenu/BottomMenu";
import MobileAddMenu from "../components/MobileAddMenu";
//
export default function LandingPage() {
  return (
    <>
    <div className=" flex justify-center mt-[4.8rem] md:mt-[5.4rem] lg:mx-[1rem]">
      <div className="flex justify-around w-full max-w-[78rem]">
        
        <PageInformation />
        <Content />
        <AdvertisingCard />
      </div>
    </div>
    <BottomMenu />
    <MobileAddMenu />
    </>
  );
}
