import React from "react";
import ActionsList from "./ActionsList";
import { IoEarthSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

interface CardHeaderProps {
  f_name: string;
  l_name: string;
  created_at: string;
  open_to_image?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  f_name,
  l_name,
  created_at,
  open_to_image,
}) => {
  return (
    <div className="px-[17.3px] py-3 w-full flex justify-between">
      <div className="flex gap-3">
        <img
          src={open_to_image ? `https://meetoonim.com/${open_to_image}` : "/"}
          alt={open_to_image || "user"}
          width="48px"
          className="rounded-full"
        />
        <div className="flex justify-center items-start flex-col">
          <p className="w-[10px] h-[10px]"></p>
          <p className="text-black/90 flex gap-1">
            {f_name}
            <p>{l_name}</p>
          </p>
          <div className="flex justify-center items-center gap-[2px]">
            <p className="text-[0.6rem] text-slate-400">{created_at}</p>
            <GoDotFill className="text-slate-400 text-[7px]" />
            <IoEarthSharp className="text-slate-400 text-[10px]" />
          </div>
        </div>
      </div>
      <div className="flex justify-end h-fit">
        <ActionsList />
      </div>
    </div>
  );
};

export default CardHeader;
