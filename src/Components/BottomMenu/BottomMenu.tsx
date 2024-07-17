import React from "react";
import { PiSquaresFourBold } from "react-icons/pi";
import { PiSuitcaseBold } from "react-icons/pi";
import { FiHome } from "react-icons/fi";
import { LuMessageCircle } from "react-icons/lu";

const itemsMenu = [
  { icon: <PiSuitcaseBold className=" text-2xl" />, label: "اگهی ها" },
  { icon: <FiHome className=" text-2xl text-sky-400" />, label: "خانه" },
  { icon: <PiSquaresFourBold className=" text-2xl" />, label: "میزکار" },
  { icon: <LuMessageCircle className=" text-2xl" />, label: "پیامرسانی " },
];

export default function BottomMenu() {
  return (
    <div className="bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] fixed md:hidden bottom-0 w-full flex items-center justify-between py-[8.1px] px-[22px] text-slate-500 font-bold text-sm gap-x-5 ">
      <img src="/digiKala.png" alt="" className="w-10 rounded-full" />
      {itemsMenu.map((item) => (
        <div className="grid justify-items-center ">
          {item.icon}
          <p className={`${item.label === "خانه" && "text-sky-400"}`}>
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
