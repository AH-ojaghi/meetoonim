import React from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosBook } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdOutlineAssignmentInd } from "react-icons/md";

const addMenuItems = [
  {icon : <HiOutlinePencilAlt/>  ,label:"بست"},
  {icon : <IoIosBook/> ,label:"بروژه"},
  {icon : <MdOutlineAssignmentInd/> ,label:"شغل"},
]
export default function AddMenu() {

const toggleMenu = () =>{

  let headerMenu =document.querySelector('.header-menu');
  console.log(headerMenu);
   headerMenu?.classList.toggle('hidden')  
}


  return (
    <div className="hidden md:flex gap-5   lg:gap-0 justify-center items-center">
      <div className="group cursor-pointer relative">
        <div onClick={toggleMenu} className="flex gap-x-2  justify-center items-center bg-sky-50 text-sky-400 rounded-lg border-[1.59px] py-[5.22px] px-[7.5px] border-sky-400 outline-0">
          <IoIosArrowDown className="text-xl" />
          <div className="flex justify-center gap-x-[1px] items-center">
            <p>افزودن</p>
            <FaRegSquarePlus className="text-xl" />
          </div>
        </div>

        <div className=" z-20 header-menu absolute -mt-1 px-2 py-2 border-2 rounded-md bg-white ">
          {addMenuItems.map((item) => (
            <div key={item.label} className="flex gap-1">
            {item.icon}
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
