import { useEffect } from "react";
import { HiCamera } from "react-icons/hi2";
import { AiFillPicture } from "react-icons/ai";

export default function Modal({ showModal, setShowModal }) {
  useEffect(() => {
    if (showModal) {
      document.getElementById("parent-modal")?.classList.remove("hidden");
      document.getElementById("modal")?.classList.remove("hidden");
    } else {
      document.getElementById("parent-modal")?.classList.add("hidden");
      document.getElementById("modal")?.classList.add("hidden");
    }
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
  }; 

  return (
    <>
      <div
        id="parent-modal"
        className={`w-[130rem] h-[130rem] z-50 bg-black/40 fixed inset-0 ${!showModal && 'translate-y-[50rem]'} duration-1000 ${showModal && 'translate-y-0'}  ${
          showModal ? "block" : "hidden"
        }`}
        onClick={closeModal}
      ></div>
      <div
        id="modal"
        className={`rounded-lg z-50 ${!showModal && 'translate-y-[50rem]'} duration-1000 ${showModal && 'translate-y-0'}  bg-gray-100 fixed pb-5 inset-5 max-w-[37.5rem] mx-auto ${
          showModal ? "block" : "hidden"
        }`}
      >
        <p className=" mt-[14px] text-lg font-bold px-[20px]">افزودن بست</p>
        <div className=" justify-start gap-2 items-center px-[20px] flex w-full">
          <img src="/digiKala.png" alt="" className="rounded-full w-14 my-6" />
          <p className="text-[15.2px]">دیجیکالا</p>
        </div>

        <div className=" grid border rounded-xl px-[20px] border-slate-200 bg-white mx-[26.5px] mt-2 h-[15.1rem]">
          <p className="mt-3 text-[1.19rem] font-bold text-sky-400">توضیحات</p>
          <textarea
            name="post"
            id=""
            className=" hover:bg-gray-100 text-black w-full h-[11.2rem] mt-2 resize-none outline-none px-3  mb-10  rounded-xl text-[0.9rem]"
            placeholder="توضیحات خود را اینجا بنویسید"
          ></textarea>
        </div>

        <div className=" text-sky-400 bg-white absolute bottom-0 flex w-full rounded-b-lg items-center justify-between px-2 py-4">
          <div className="flex gap-3 text-[1.65rem]">
            <AiFillPicture className="rounded-[15px]"/>
            <HiCamera />
          </div>
          <div className="text-[16px] px-4 h-7 rounded-[10px] bg-sky-400 text-white ">
            <p className="mt-[2px]">
              ثبت
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
