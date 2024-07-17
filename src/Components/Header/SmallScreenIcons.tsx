import React from "react";
import { FaBell } from "react-icons/fa";
import { RiPulseFill } from "react-icons/ri";

export default function SmallScreenIcons() {
  const rotateY180Style = { transform: "rotateY(180deg)" };

  
  return (
    <div className="flex mr-5 text-slate-500 w-20 font-bold items-center justify-center gap-x-5 md:hidden">
      <FaBell className="text-xl" />
      <RiPulseFill className="text-2xl" style={rotateY180Style} />
    </div>
  );
}
