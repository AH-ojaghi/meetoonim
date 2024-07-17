import React from "react";
import { PiSuitcaseBold } from "react-icons/pi";
import { CgBookmark } from "react-icons/cg";
import { MdOutlinePerson } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
// import { BsFileEarmarkTextFill } from "react-icons/bs";
import { PiNoteBold } from "react-icons/pi";

const AccountItems = [
  { icon: <MdOutlinePerson className="text-3xl " />, label: "پروفایل" },
  { icon: <PiSuitcaseBold className="text-3xl " />, label: "آگهی های من" },
  {
    icon: <RiStarLine className="text-3xl " />,
    label: "آگهی های منتخب",
  },
  {
    icon: <CgBookmark className="text-3xl " />,
    label: "پستهای نشان شده",
  },
  {
    icon: (
      <PiNoteBold
        style={{ transform: "rotateZ(180deg)" }}
        className="text-3xl "
      />
    ),
    label: "پستهای من",
  },
];
export default function ProfileLinks() {
  return (
    <div className="flex-col w-full font-bold py-5 gap-[20.5px] text-slate-500  pr-7 border-b border-slate-200 flex">
      {AccountItems.map((item, index) => (
        <div key={index} className="flex items-center gap-x-3">
          {item.icon}
          <p className="text-[1.1rem]">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
