import React from "react";
import { LuSearch } from "react-icons/lu";


export default function SearchBar() {
  const searchBarWidth = {width : "calc(100% + 20px)"}
  return (
    <div className="flex cursor-pointer  justify-between items-center bg-slate-50 w-full mb-1 md:w-fit mr-[2px]">
      <div className="flex text-slate-500 justify-start items-center gap-2 md:hidden h-[37.9px] border border-slate-200 rounded-md" style={searchBarWidth}>
        <LuSearch className="w-5 text-2xl rotate-90  mr-[10px] mt-[1.59px]"/>
        <p className=" text-base">جست و جو</p>
      </div>
    </div>
  );
}
