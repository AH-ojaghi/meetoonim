import React, { useEffect, useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosBook } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdOutlineAssignmentInd } from "react-icons/md";
import Modal from "../../Utils/Modal";

const addMenuItems = [
  {
    icon: (
      <HiOutlinePencilAlt
        className="text-[1.6rem]"
        style={{ transform: "rotateY(180deg)" }}
      />
    ),
    label: "بست",
  },
  { icon: <IoIosBook className="text-[1.6rem]" />, label: "بروژه" },
  { icon: <MdOutlineAssignmentInd className="text-[1.6rem]" />, label: "شغل" },
];
export default function AddMenu() {

const toggleMenu = () =>{
  let headerMenu =document.querySelector('.header-menu');
  console.log(headerMenu);
   headerMenu?.classList.toggle('hidden')  
}
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const headerMenu = document.querySelector(".header-menu");
 //
  const OpenMenu = () => {
    headerMenu?.classList.add("md:block");
    setIsOpenMenu(true);
    document.querySelector(".close-menu")?.classList.remove("hidden");
  };
//
  const postModal = (e) =>{
  let addItems = e.currentTarget.childNodes[1].innerText;
  if(addItems === "بست") document.querySelector(".post-modal")?.classList.add('block')
  return;
  }
//
  const closeMenu = () => {
    headerMenu?.classList.remove("md:block");
    headerMenu?.classList.add("hidden");
    document.querySelector(".close-menu")?.classList.add("hidden");
    setIsOpenMenu(false);
  };
//
  return (
    <div className="hidden md:flex gap-5 lg:gap-0 justify-center items-center">
      <div className=" hidden post-modal">
        <Modal />
      </div>
      <div
        className="hidden bg-transparent w-[160rem] h-[120rem] z-20 fixed close-menu"
        onClick={closeMenu}
      ></div>
      <div
        id="header-menu"
        className={`${
          isOpenMenu  && "h-[153px] py-[9px]"
        } z-20 header-menu duration-300 py-0 h-0  shadow-[0_1px_12px_-0px_rgba(0,0,0,0.2)]  pr-4 border-none absolute w-[7rem] top-[13.99px] right-[8.9rem] border-2 rounded-md bg-white`}
      >
        {addMenuItems.map((item) => (
          <div
            key={item.label}
            onClick={postModal}
            className={` items-center h-0  text-slate-500/85 gap-x-0 ${
              !isOpenMenu && "hidden text-[0px]"
            } ${
              isOpenMenu &&
              " items-center h-[48.32px] flex gap-x-1 text-[15px]"
            }`}
          >
            {item.icon}
            <p className=" text-black">{item.label}</p>
          </div>
        ))}
      </div>
      <div 
      className="group cursor-pointer relative">
        <div
          onClick={OpenMenu}
          className="flex gap-x-2  justify-center items-center bg-sky-50 text-sky-400 rounded-lg border-[1.59px] py-[5.22px] px-[7.5px] border-sky-400 outline-0"
        >
          <IoIosArrowDown className="text-xl" />
          <div className="flex justify-center gap-x-[1px] items-center">
            <p>افزودن</p>
            <FaRegSquarePlus className="text-xl" />
          </div>
        </div>
        {/* <div className=" z-20 header-menu absolute -mt-1 px-2 py-2 border-2 rounded-md bg-white ">
          {addMenuItems.map((item) => (
            <div key={item.label} className="flex gap-1">
            {item.icon}
              <p>{item.label}</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
