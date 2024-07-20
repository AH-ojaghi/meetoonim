import { useEffect, useState } from "react";
import { RiPulseFill } from "react-icons/ri";
import { RxExit } from "react-icons/rx";
import { FiCreditCard } from "react-icons/fi";

export default function Logo() {
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
    <>
          <img
        src="/digiKala.png"
        alt="digiKala"
        className="w-10 hidden md:block"
      />

      <button
        onClick={toggleDropdown}
        className="dropdown font-bold text-[1rem] hidden md:block text-sky-400 mb-[0.2rem]"
     
      >
        دیجیکالا
      </button>


      <div
        className={`dropdown absolute  header-menu z-20 duration-300 -mt-2 w-56 rounded-md shadow-lg bg-white ring-1  px-2 py-2 top-[18px] ring-black ring-opacity-5 transition-max-height ease-in-out ${
          dropdownOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
       
      >
        <div className="md:block w-[200px] h-[250px] rounded-[8px]">
          <div className="flex gap-3">
            <img
              src="/digiKala.png"
              alt="digiKala"
              className="w-[50px] h-[50px] md:block"
            />
            <div className="flex flex-col">
              <p className="text-[#3abdf8] font-bold">دیجیکالا</p>
              <p className="text-[#3abdf8]">فروشگاه آنلاین</p>
            </div>
          </div>
          <div className="mt-3 flex w-[200px] justify-center pb-2 border-b-2 border-[#eeeeee]">
            <button className="text-[#3abdf8] text-[15px] w-[190px] h-[26px] rounded-[15px] border-2 border-[#3abdf8]">
              مشاهده پروفایل
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <p className="font-bold">مدیریت</p>
            <div className="flex justify-between">
              <p>فعالیتها</p>
              <RiPulseFill
                className="w-[20px] h-[20px]"
                style={{ transform: "rotateY(180deg)" }}
              />
            </div>
            <div className="flex justify-between mb-2">
              <p>مدیریت پرداختها</p>
              <FiCreditCard className="w-[20px] h-[20px]" />
            </div>
            <hr />
            <div className="flex justify-between">
              <p>خروج</p>
              <RxExit className="w-[20px] h-[20px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}