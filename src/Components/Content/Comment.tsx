import React from "react";
import { IoEarthSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";

export default function Comment({ logo, username, time, text }) {
  return (
    <div className="flex flex-col px-3 my-3">
      <div className="flex items-center gap-5">
        <img src={logo} alt="" className="w-9 rounded-full mb-5 bg-purple-600" />
        <div className="bg-gray-100 w-[90%]  px-3 rounded-lg">
          <div className="flex justify-between">
            <div className="flex gap-1 text-xs mt-2 ">
              <p className="text-black/60">{username}</p>
              <span className="text-gray-400">o</span>
              <p className="text-gray-400 font-light">{time}</p>
            </div>
            <div className="flex items-center justify-center mt-2 ml-[5px] gap-1">
              <p className="text-[8px] text-slate-400 mt-[1px] ml-[3px]">0</p>
              <FaRegHeart className="text-slate-600 text-xs" />
            </div>
          </div>
          <p className=" text-sm my-1">{text}</p>
        </div>
      </div>
      <p className="text-xs text-black/30 w-fit mr-[4.5rem] my-3">باسخ</p>
    </div>
  );
}

