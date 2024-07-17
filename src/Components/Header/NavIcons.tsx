import React, { useEffect, useState } from "react";
import { FiHome, FiBell } from "react-icons/fi";
import { PiSuitcaseBold } from "react-icons/pi";
import { RiGroupLine } from "react-icons/ri";
import { LuMessageCircle } from "react-icons/lu";
import { IoMdSearch } from "react-icons/io";

const icons = [
  { icon: <FiHome className="text-[1.4rem] text-sky-500" />, label: "خانه" },
  { icon: <PiSuitcaseBold className="text-[1.4rem]" />, label: "اگهی ها" },
  { icon: <RiGroupLine className="text-[1.4rem]" />, label: "میزکار ها" },
  { icon: <LuMessageCircle className="text-[1.4rem]" />, label: "پیام ها" },
  { icon: <FiBell className="text-[1.4rem]" />, label: "اعلان ها" },
  {
    icon: <IoMdSearch className="text-[1.4rem] text-sky-500" />,
    label: "جست و جو",
  },
];

export default function NavIcons() {
  const [windowOuterwidth, setWindowOuterwidth] = useState(window.outerWidth);
  const oldScreenWidth = window.innerWidth;

  useEffect(() => {
    window.addEventListener("resize", function (e) {
      if (oldScreenWidth != e.target.screen.availWidth) {
        setWindowOuterwidth(e.target.screen.availWidth);
      }
    });
  }, []);

  return (
    <>
      {icons.map((item, index) => (
        <div
          key={index}
          className={` ${
            windowOuterwidth >= 1024 && item.label === "جست و جو"
              ? "hidden"
              : "flex"
          } flex-col-reverse justify-center ${
            item.label === "جست و جو" || item.label === "خانه"
              ? "text-sky-400"
              : ""
          } mx-5 lgs:mx-[21px] items-center`}
        >
          <p className="hidden lgs:block text-sm">{item.label}</p>
          {item.icon}
        </div>
      ))}
    </>
  );
}
