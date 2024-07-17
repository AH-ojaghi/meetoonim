import React from "react";
import { IoEarthSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";

function Action({ img, text }) {
  return (
    <div className="grid gap-y-1 justify-items-center">
      {img}
      <p className="font-bold">{text}</p>
    </div>
  );
}

export default function Card({
  logo,
  companyName,
  time,
  postText,
  image,
  commentsCount,
  actions,
  children,
}) {
  return (
    <div className=" mb-2 md:rounded-xl md:mb-4 bg-white border border-slate-200">
      <div className="px-[17.3px] py-3 flex justify-between">
        <div className="flex gap-3 ">
          <img src={logo} alt={companyName} className="w-10" />
          <div className="flex justify-center items-start flex-col">
            <p className=" text-black/90">{companyName}</p>
            <div className="flex justify-center items-center gap-[2px]">
              <p className="text-[0.6rem] text-slate-400">{time}</p>
              <GoDotFill className="text-slate-400 text-[7px]" />
              <IoEarthSharp className="text-slate-400 text-[10px] " />
            </div>
          </div>
        </div>
        <BsThreeDotsVertical className="text-slate-400 mt-[0.85px] text-xl " />
      </div>
      <p className="px-3 pb-[0.60rem] pt-2 mb-[0.3rem] text-black/90 text-sm">{postText}</p>
      {image && <img src={image} alt="" className="h-[23rem] mt-3 w-full" />}
      {commentsCount && (
        <p className="text-left px-3 text-black/50 text-xs my-2">
          {commentsCount}
        </p>
      )}
      <div className="flex justify-around text-slate-60 py-2 text-[0.63rem] font-bold text-black/60 border-t">
        {actions.map((item, index) => (
          <Action key={index} img={item.img} text={item.label} />
        ))}
      </div>
      {children}
    </div>
  );
}
