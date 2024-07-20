import React, { useEffect, useState } from "react";
import { IoEarthSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";

function Action({ img, text }: { img: React.ReactNode; text: string }) {
  // const colors = ["black", "red"];
  // const [color, setColor] = useState(colors[0]);
  // const handleClick = () => {
  //   const currentIndex = colors.indexOf(color);
  //   const nextIndex = (currentIndex + 1) % colors.length;
  //   setColor(colors[nextIndex]);
  // }
  return (
    <div className="grid gap-y-1  justify-items-center">
      <div>{img}</div>
      <p className="font-bold">{text}</p>
    </div>
  );
}

const actionsList = [
  { name: "اشتراک گذاری" },
  { name: "بلاک کردن" },
  { name: "دنبال کردن" },
  { name: "دوستی" },
];

export default function Card({
  logo,
  companyName,
  time,
  postText,
  image,
  commentsCount,
  actions,
  children,
}: {
  logo: string;
  companyName: string;
  time: string;
  postText: string;
  image?: string;
  commentsCount?: string;
  actions: { img: React.ReactNode; label: string }[];
  children?: React.ReactNode;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
          <img src={logo} alt={companyName} className="w-10" />
          <div className="flex justify-center items-start flex-col">
            <p className="text-black/90">{companyName}</p>
            <div className="flex justify-center items-center gap-[2px]">
              <p className="text-[0.6rem] text-slate-400">{time}</p>
              <GoDotFill className="text-slate-400 text-[7px]" />
              <IoEarthSharp className="text-slate-400 text-[10px]" />
            </div>
          </div>
        </div>
        <div className=" flex justify-end  h-fit ">
          <div className="dropdown relative  inline-block">
            <button
              onClick={toggleDropdown}
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
      <p className="px-3 pb-[0.60rem] pt-2 mb-[0.3rem] text-black/90 text-sm">
        {postText}
      </p>
      {image && <img src={image} alt="" className="h-[23rem] mt-3 w-full" />}
      {commentsCount && (
        <p className="text-left px-3 text-black/50 text-xs my-2">
          {commentsCount}
        </p>
      )}
      <div className="flex justify-around text-slate-60 py-2 text-[0.63rem] font-bold text-black/60 border-t">
        {actions.map((item, index) => {
          return (
            <>
              <Action key={index} img={item.img} text={item.label} />
            </>
          );
        })}
      </div>
      {children}
    </div>
  );
}
