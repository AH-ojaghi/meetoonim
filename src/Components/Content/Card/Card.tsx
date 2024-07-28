import React, { useState } from "react";
import Slider from "../../../Utils/Slider";
import Action from "./Action";
import CardHeader from "./CardHeader";
import { FaRegBookmark, FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import { MdOutlineIosShare } from "react-icons/md";
interface CardProps {
  id: number;
  isLike: boolean;
  description: string;
  created_at: string;
  f_name: string;
  l_name: string;
  open_to_image?: string;
  thumbnail?: string;
  comments_count?: number;
}

const cardItems = [
  {
    img: <FaRegHeart className="text-gray-500/95 text-[18px]" />,
    label: "بسندیدن",
  },
  {
    img: <FaRegCommentAlt className="text-gray-500/95 text-[16px]" />,
    label: "نظرات",
  },
  {
    img: (
      <MdOutlineIosShare className="text-gray-500/95 text-[20px] -mt-[2px]" />
    ),
    label: "اشتراک گذاری",
  },
  {
    img: <FaRegBookmark className="text-gray-500/95 text-[16px]" />,
    label: "ذخیره",
  },
];

const Card: React.FC<CardProps> = ({
  id,
  data,
  description,
  created_at,
  f_name,
  l_name,
  open_to_image,
  thumbnail,
  comments_count,
}) => {
  const eachThumbnail = thumbnail ? thumbnail.split(",") : [];
  return (
    <div className="mb-2 md:rounded-xl md:mb-4 bg-white border border-slate-200">
      <CardHeader
        f_name={f_name}
        l_name={l_name}
        created_at={created_at}
        open_to_image={open_to_image}
      />
      <p className="px-3 pb-[0.60rem] pt-2 mb-[0.3rem] text-black/90 text-sm flex justify-between">
        {description}
      </p>
      {thumbnail && (
        <Slider thumbnail={thumbnail} eachThumbnail={eachThumbnail} />
      )}
      <div className="justify-end flex h-[30px] items-center ml-2">
        {comments_count ? (
          <p className="font-B text-[10px] text-[#a6a6a6] flex gap-1">
            {comments_count}
            <p className="text-[#a6a6a6]">نظر</p>
          </p>
        ) : null}
      </div>
      <div className="flex justify-around text-slate-60 py-2 text-[0.63rem] font-bold text-black/60 border-t">
        {cardItems.map((item, index) => (
          <div key={index}>
            <Action img={item.img} text={item.label} id={id} data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
