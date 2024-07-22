import { useEffect, useRef } from "react";
import { HiCamera } from "react-icons/hi2";
import { AiFillPicture } from "react-icons/ai";

export default function Modal({ showModal, setShowModal }) {
  const bgModal = useRef(null);
  const contentModal = useRef(null);

  //

  const closeModal = () => {
    setShowModal(false);
  };
  // if (showModal) {
  //   setTimeout(() => {
  //     bgModal?.classList.remove("hidden");
  //     contentModal?.classList.remove("hidden");
  //   }, 1000);
  // }
  // if (!showModal) {
  //   setTimeout(() => {
  //     bgModal?.classList.add("hidden");
  //     contentModal?.classList.add("hidden");
  //   }, 1000);
  // }

  return (
    // <div
    //   id="bg-modal"
    //   onClick={closeModal}
    //   className={`w-screen duration-300 bg-black/40 ${
    //     showModal ? "h-0" : "h-full"
    //   }`}
    // >
    //   <div
    //     id="bg-modal"
    //     className={`w-screen duration-200 h-screen z-50 bg-black/40 fixed inset-0 ${
    //       !showModal && "h-0 "
    //     }  ${showModal && "h-full "}`}
    //     onClick={closeModal}
    //   ></div>
    //
    //
    //////////////////
    // <div
    //   className={`rounded-lg duration-200 z-50 ${!showModal && "h-0"} ${
    //     showModal && "h-[95%]"
    //   }  bg-gray-100 fixed pb-5 inset-x-5 inset-y-[18.5px] max-w-[37.5rem] mx-auto`}
    // >
    // <div className="  bg-red-50 w-full  h-full  ">

    //     <p
    //       className=" mt-[14px] text-lg font-bold px-[20px]"
    //     >
    //       افزودن پست
    //     </p>
    //     <div className=" justify-start gap-2 items-center px-[20px] flex w-full">
    //       <img src="/digiKala.png" alt="" className="rounded-full w-14 my-6" />
    //       <p className="text-[15.2px]">دیجیکالا</p>
    //     </div>

    //     <div className=" grid border rounded-xl px-[20px] border-slate-200 bg-white mx-[26.5px] mt-2 h-[15.1rem]">
    //       <p className="mt-3 text-[1.19rem] font-bold text-sky-400">توضیحات</p>
    //       <textarea
    //         name="post"
    //         className=" hover:bg-gray-100 text-black w-full h-[11.2rem] mt-2 resize-none outline-none px-3 mb-10  rounded-xl text-[0.9rem]"
    //         placeholder="توضیحات خود را اینجا بنویسید"
    //       ></textarea>
    //     </div>

    //     <div className=" text-sky-400 bg-white absolute bottom-0 flex w-full rounded-b-lg items-center justify-between px-2 py-4">
    //       <div className="flex gap-3 text-[1.65rem]">
    //         <AiFillPicture className="rounded-[15px]" />
    //         <HiCamera />
    //       </div>
    //       <div className="text-[16px] px-4 h-7 ml-[11.6px] rounded-[10px] bg-sky-400 text-white ">
    //         <p className="mt-[2px]">ثبت</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <div className=" fixed inset-0  bg-black/40 w-[100%] h-[100%] z-40">
        <div
          className={`rounded-lg duration-200 z-50  bg-gray-100  pb-5 inset-x-5 inset-y-[18.5px] max-w-[37.5rem] mx-auto`}
        >
          <div className="  bg-red-50 w-full  h-full  ">
            <p className=" mt-[14px] text-lg font-bold px-[20px]">افزودن پست</p>
            <div className=" justify-start gap-2 items-center px-[20px] flex w-full">
              <img
                src="/digiKala.png"
                alt=""
                className="rounded-full w-14 my-6"
              />
              <p className="text-[15.2px]">دیجیکالا</p>
            </div>

            <div className=" grid border rounded-xl px-[20px] border-slate-200 bg-white mx-[26.5px] mt-2 h-[15.1rem]">
              <p className="mt-3 text-[1.19rem] font-bold text-sky-400">
                توضیحات
              </p>
              <textarea
                name="post"
                className=" hover:bg-gray-100 text-black w-full h-[11.2rem] mt-2 resize-none outline-none px-3 mb-10  rounded-xl text-[0.9rem]"
                placeholder="توضیحات خود را اینجا بنویسید"
              ></textarea>
            </div>

            <div className=" text-sky-400 bg-white absolute bottom-0 flex w-full rounded-b-lg items-center justify-between px-2 py-4">
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
      </div>
    </>
  );
}
