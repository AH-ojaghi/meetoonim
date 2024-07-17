import React from "react";

export default function StoreInfo() {
  return (
    <>
      <img
        src="/akhenaten.jpg"
        alt="akhenaten"
        className="rounded-t-lg h-24 w-full"
      />
      <div className="text-sky-400 grid justify-items-center gap-y-[6.5px] ">
        <img
          src="/jet_logo.webp"
          alt="jet"
          className=" rounded-xl w-[99px] -mt-[3rem] border-[3.5px] border-slate-100 "
        />
        <p className="font-bold text-[1.5rem]">دیجیکالا</p>
      </div>
      <div className=" grid justify-items-center mt-[1px]">
        <h3 className=" text-[1.15rem] font-bold text-slate-700">
          فروشگاه انلاین
        </h3>
        <p className="w-fit text-[1rem] line-clamp-4 h-fit text-justify px-[9px] text-gray-600 mb-4 mt-[8.5px] leading-4">
          هر آنچه که نیاز دارید با بهترین قیمت از دیجیکالا بخرید! جدیدترین انواع
          گوشی موبایل, لپ تاپ, لباس, کتاب, لوازم خانگی, لوازم آرایشی و بهداشتی,
          خودرو و...
        </p>
      </div>
      <div className="text-[1.05rem] py-[9px]  border-t border-b text-slate-700 flex items-center justify-between border-slate-300 font-bold px-[12px]">
        <p >دنبال کننده</p>
        <p className=" text-sky-500 font-normal">4</p>
      </div>
      <div className="text-[1.05rem] py-[9px] font-bold px-[12px] flex items-center text-slate-700 justify-between border-slate-300">
        <p>دنبال میکنید</p>
        <p className=" text-sky-500 font-normal">1</p>
      </div>
    </>
  );
}
