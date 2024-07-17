import React from "react";
import { LuSearch } from "react-icons/lu";
import AddMenu from "./AddMenu";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";
import SmallScreenIcons from "./SmallScreenIcons";
import { IoMdSearch } from "react-icons/io";
import Logo from "./Logo";

export default function Header() {
  return (
    <div className="fixed flex -top-1 z-20 w-full h-[4rem]  ">
      <header className="flex justify-between md:px-9  px-2 items-center  bg-white w-full xl:px-[9rem]">
        <div>
          <div className="flex gap-3 items-center ">
          <Logo/>
          <AddMenu /> 
          </div>
        </div>
        <SearchBar />
        <div className="hidden md:flex justify-center xl:flex-1 text-gray-500 lg:w-10/12 items-center">
          <NavIcons />
          <div className="flex gap-3 justify-center items-center">
          
            <img
              src="/digiKala.png"
              alt="digiKala"
              className="w-10 mr-3 lg:hidden"
            />
          </div>
        </div>

        <div className="text-sm hidden lg:grid  xl:hidden text-sky-500 w-20 justify-items-center ml-3">
          <IoMdSearch className="text-[1.4rem] " />
          <p>جست و جو</p>
        </div>
        <div className="xl:flex justify-start items-center gap-1 py-[1.12rem] px-2 hidden text-slate-500 w-[14rem] h-8 border border-slate-200 bg-slate-100 rounded-[0.25rem]">
              <LuSearch className="text-lg rotate-90 mr-1" />
              <p className="text-md">جست و جو</p>
            </div>
        <img
          src="/digiKala.png"
          alt="digiKala"
          className="w-10 mr-3 lg:block hidden"
        />

        <SmallScreenIcons />
      </header>
    </div>
  );
}
