import PageInformation from "../Components/PageInformation/PageInformation";
import Content from "../Components/Content/Content";
import AdvertisingCard from "../Components/AdvertisingCard/AdvertisingCard";

export default function LandingPage() {
  return (
    <div className=" flex justify-center mt-[4.8rem] md:mt-[5.4rem] lg:mx-[1rem]">
      <div className="flex justify-around w-full max-w-[78rem]">
        <PageInformation />
        <Content />
        <AdvertisingCard />
      </div>
    </div>
  );
}
