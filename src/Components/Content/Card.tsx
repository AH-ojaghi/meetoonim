import React, { useEffect, useState } from "react";
import { IoEarthSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { FaRegBookmark, FaRegHeart } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdOutlineIosShare } from "react-icons/md";
function Action({ img, text }: { img: React.ReactNode; text: string }) {
  const [color, setColor] = useState("black");

  const HandelColor = () => {
    //اینجا گفتیم اگر text  با کلمه بسندیدن  برابر باشه قرمز اگر نه مشکی
    const newColor = text === "بسندیدن" ? `${(<FcLike />)}` : "black";
    setColor((prevColor) =>
      prevColor === newColor ? `${(<FcLike />)}` : newColor
    );
  };

  return (
    <div className="grid gap-y-1  justify-items-center">
      <div onClick={HandelColor} style={{ color }}>
        {img}
      </div>
      <p className="font-bold">{text}</p>
    </div>
  );
}
const cardItems = [
  { img: <FaRegHeart className="text-[18px]" />, label: "بسندیدن" },
  { img: <FaRegCommentAlt className="text-[16px]" />, label: "نظرات" },
  {
    img: <MdOutlineIosShare className="text-[20px] -mt-[2px]" />,
    label: "اشتراک گذاری",
  },
  { img: <FaRegBookmark className="text-[16px]" />, label: "ذخیره" },
];

const actionsList = [
  { name: "اشتراک گذاری" },
  { name: "بلاک کردن" },
  { name: "دنبال کردن" },
  { name: "دوستی" },
];

export default function Card({
  description,
  created_at,
  f_name,
  l_name,
  open_to_image,
  thumbnail,
  comments_count,
  likes_count,
  comment,
}: {
  description: string;
  created_at: string;
  f_name: string;
  l_name: string;
  open_to_image: string;
  thumbnail: string;
  comments_count: string;
  likes_count: number;
  comment:string
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [favoriteIndex, setFavoriteIndex] = useState<null | number>(null);
  const toggleFavorite = (index: null) => {
    setFavoriteIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const eachThumbnail = thumbnail.split(",");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: Event) => {
    if (!(event.target as HTMLElement).closest(".dropdown")) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-2 md:rounded-xl md:mb-4 bg-white border border-slate-200">
      <div className="px-[17.3px] py-3 w-full flex justify-between">
        <div className="flex gap-3">
          <img
            src={open_to_image ? `https://meetoonim.com/${open_to_image}` : "/"}
            alt={open_to_image}
            className="w-10 rounded-full"
          />

          <div className="flex justify-center items-start flex-col">
            <p className=" w-[10px] h-[10px]"></p>
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
        <div className=" flex justify-end  h-fit ">
          <div className="dropdown relative  inline-block">
            <button
              onClick={() => {
                toggleDropdown();
              }}
              className="dropbtn rounded focus:outline-none text-start"
            >
              <BsThreeDotsVertical />
            </button>
            <div
              id="myDropdown"
              className={`dropdown z-10 absolute w-36 mt-2 left-0 bg-white border border-gray-200 rounded shadow-lg transition-all duration-500 ${
                dropdownOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              {actionsList.map((item, index) => (
                <a
                  key={index}
                  className="block px-4 py-2 text-black hover:bg-gray-200"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="px-3 pb-[0.60rem] pt-2 mb-[0.3rem] text-black/90 text-sm flex  justify-between">
        {description}
      </p>
      {thumbnail && (
        <div>
          {...eachThumbnail.map((t) => (
            <img
              src={thumbnail ? `https://meetoonim.com/${t}` : "/"}
              alt={thumbnail}
              className="h-[23rem] mt-3 w-full"
            />
          ))}
        </div>
      )}
      <div className="justify-end flex h-[20px] items-center ml-2">
        {comments_count ? (
          <p className="font-B  text-[10px] text-[#a6a6a6] flex gap-1">
            {comments_count}
            <p className="text-[#a6a6a6]">نظر</p>
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-around text-slate-60 py-2 text-[0.63rem] font-bold text-black/60 border-t">
        {cardItems.map((item, index: any) => {
          return (
            <div
              key={index}
              onClick={() => item.label === "بسندیدن" && toggleFavorite(index)}
            >
              {favoriteIndex === index ? (
                <div className="">
                  <Action
                    img={
                      item.label === "بسندیدن" ? (
                        <FcLike className="text-[19px] -mt-[2px]" />
                      ) : (
                        item.img
                      )
                    }
                    text={item.label}
                  />
                </div>
              ) : (
                <Action img={item.img} text={item.label} />
              )}
            </div>
          );
        })}
      </div>
      {
        <div className="w-full flex justify-center gap-3">
          <img src={open_to_image ? `https://meetoonim.com/${open_to_image}` : "/"} className="bg-blue-400 w-[40px] h-[50px]  rounded-full" />

          <div className="w-[500px] h-[60px] rounded-[10px] flex justify-between ">
            <div className="flex  flex-col">
              <div className="flex items-center justify-center">
                <p className="text-[10px]">فروشگاه دیجیکالا</p>
                <p className="text-[10px] text-[#9797bd]">{created_at}</p>
              </div>
              <div className="flex  items-center">
                <p className="text-[11px]">{comment}</p>
              </div>
            </div>

            <div
              onClick={() => toggleFavorite}
              className="flex items-center justify-center gap-3"
            >
              <p>{likes_count}</p>
              <div>{favoriteIndex ? <FcLike /> : <FaRegHeart />}</div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
