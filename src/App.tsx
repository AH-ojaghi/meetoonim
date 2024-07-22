import LandingPage from "./Pages/LandingPage";
import Header from "./Components/Header/Header";
import BottomMenu from "./Components/BottomMenu/BottomMenu";
import MobileAddMenu from "../src/Components/MobileAddMenu";
// import Modal from "./Utils/Modal";

//modal
import { HiCamera } from "react-icons/hi2";
import { AiFillPicture } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
//modal

import { useRef } from "react";
export default function App() {
  const Modal = useRef(null);
  const modalHandler = function () {
    // Modal.current.style.display = "none";  ==> hidden bg-parent with control flag state
  };
  return (
    <>
      <Header />
      <LandingPage />
      <BottomMenu />
      <MobileAddMenu />
      {/* Modal */}
      <div
        ref={Modal}
        className=" bg-black/40 w-full h-full fixed inset-0 z-50"
        onClick={modalHandler}
      >
        <div className="grid bg-white max-w-[602px] relative w-full h-screen px-[26px] pt-[14px] rounded-lg">
          <div className="flex  w-full">
            <IoCloseOutline className="text-[32px] w-fit h-fit -mr-3" />
            <p className="text-xl text-sky-400 h-fit w-full text-center ml-[25px]">
              ایجاد پست
            </p>
          </div>
          <div
            className="-mr-[6px] grid gap-3 -mt-2"
          >
            <p className="text-lg font-bold ">افزودن پست </p>
            <div className="flex h-fit justify-start items-center gap-2 mt-[5px] ">
              <img src="/digiKala.png" alt="" className="rounded-full w-14" />
              <p className="text-sm font-bold ">دیجیکالا</p>
            </div>
          </div>
          <div className="border rounded-xl border-slate-200 bg-white h-[15rem] px-5">
            <p className=" text-lg  font-bold text-sky-400 my-[8px] ">توضیحات</p>
            <textarea
              name="postContent"
              className=" resize-none bg-gray-100  rounded-xl text-sm h-[11.5rem] p-1 w-full"
              placeholder="توضیحات خود را اینجا بنویسد"
              style={{lineHeight:'1.1'}}
              id=""
            ></textarea>
          </div>
          <div className=" text-sky-400 absolute bottom-0 bg-white flex w-full rounded-b-lg items-center justify-between px-2 py-4">
            <div className="flex gap-3 text-[1.65rem]">
              <AiFillPicture className="rounded-[15px]" />
              <HiCamera />
            </div>
            <div className="text-[16px] px-4 h-7 ml-[11.6px] rounded-[10px] bg-sky-400 text-white ">
              <p className="mt-[2px]">ثبت</p>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
    </>
  );
}
