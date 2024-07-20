import React from "react";
import { RiPulseFill } from "react-icons/ri";
import { RxExit } from "react-icons/rx";
import { FiCreditCard } from "react-icons/fi";
// const addMenuItems = [
//   { icon: "", label: "بست" },
//   { icon: "", label: "بروژه" },
//   { icon: "", label: "شغل" },
// ];
export default function Logo() {
  const drap = () => {
    let headerMenu = document.querySelector(".header-menu");
    console.log(headerMenu);
    headerMenu?.classList.toggle("hidden");
  };
  const rotateY180Style = { transform: "rotateY(180deg)" };

  return (
    <>
      <img src="/digiKala.png" alt="digiKala" className="w-10  hidden  md:block" />
      <button
        onClick={drap}
        className="font-bold text-[1rem] hidden md:block text-sky-400 mb-[0.2rem]  "
      >
        دیجیکالا
      </button>

      <div className="hidden md:block z-20 header-menu absolute -mt-1 px-2 py-2 top-10  border-2 rounded-md bg-white ">
        <div className="hidden md:block w-[200px] h-[250px] rounded-[8px]">
          <div className="flex gap-3 ">
            <img
              src="/digiKala.png"
              alt="digiKala"
              className="w-[50px] h-[50px] md:block"
            />
            <div className="flex flex-col ">
              <p className="text-[#3abdf8] font-bold">دیجیکالا</p>
              <p className="text-[#3abdf8]">فروشگاه آنلاین </p>
            </div>
          </div>
          <div className="mt-3 flex w-[200px] justify-center pb-2 border-b-2 border-[#eeeeee]">
            <button className="text-[#3abdf8] text-[15px] w-[190px] h-[26px] rounded-[15px] border-2 border-[#3abdf8]">
              مشاهده پروفایل
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <p className="font-bold">مدیریت</p>
            <div className="flex justify-between">
              <p>فعالیتها</p>
              <RiPulseFill className="w-[20px] h-[20px]" style={rotateY180Style} />
            </div>
            <div className="flex justify-between mb-2">
              <p>مدیریت پرداختها</p>
              <FiCreditCard className="w-[20px] h-[20px]"/>{" "}
            </div>
            <hr />
            <div className="flex justify-between">
              <p>خروج</p>
              <RxExit className="w-[20px] h-[20px]"/>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
