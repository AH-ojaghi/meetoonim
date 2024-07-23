//modal
import { HiCamera } from "react-icons/hi2";
import { AiFillPicture } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
//modal

function Modal() {


  return (
    <div
      className=" bg-black/40 w-full h-full fixed inset-0 z-50 "
    >
      <div className=" bg-gray-50 max-w-[602px] relative w-full h-screen md:top-5 md:h-[93.35%] px-[26px] pt-[14px] rounded-lg sm:mx-auto">
        <div className="flex absolute bg-transparent z-50 max-w-[602px] w-5/6 left-[12%]  h-[53px] md:hidden ">
          <IoCloseOutline className="text-[27px] w-fit h-fit -mr-[5px] " />
          <p className="text-xl text-sky-400 h-fit text-center  mx-auto">
            ایجاد پست
          </p>
        </div>
        <p className="text-lg font-bold h-fit mt-[4.7rem] md:mt-0 -mr-[6px]  ">
          افزودن پست{" "}
        </p>
        <div className="flex h-fit items-center gap-x-3 -mr-[6px] mt-[2.7rem] mb-[41.4px] md:mt-[1.5rem] md:mb-[55px] ">
          <img src="/digiKala.png" alt="" className="rounded-full w-14" />
          <p className="text-sm font-bold ml-3 md:-mt-[1px] md:text-[15px] ">
            دیجیکالا
          </p>
        </div>
        <div className="border rounded-xl border-slate-200 h-[15.35rem] -mt-2 px-5  md:mx-[1px] md:-mt-[23px]">
          <p className=" text-lg  font-bold text-sky-400 my-[8px] ">توضیحات</p>
          <textarea
            name="postContent"
            className=" resize-none bg-gray-100  rounded-xl text-[15px] h-[11.5rem] p-1 px-3  w-full  outline-none"
            placeholder="توضیحات خود را اینجا بنویسد"
            style={{ lineHeight: "1.1" }}
            id=""
          ></textarea>
        </div>
        <div className=" text-sky-400 bg-white flex w-full max-w-[602px] md:bottom-[1px] rounded-b-lg items-center absolute bottom-[4px] justify-between right-0 px-2 py-3 md:py-4">
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
  );
}

export default Modal;
