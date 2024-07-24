import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const actionsList = [
  { name: "اشتراک گذاری" },
  { name: "بلاک کردن" },
  { name: "دنبال کردن" },
  { name: "دوستی" },
];

const ActionsList: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
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

  useEffect(() => {
    window.onscroll = dropdownOpen
      ? () => {
          window.scrollTo(0, 0);
        }
      : null;
  }, [dropdownOpen]);

  return (
    <div className="dropdown relative inline-block">
      <button
        onClick={toggleDropdown}
        className="dropbtn rounded focus:outline-none text-start"
      >
        <BsThreeDotsVertical className="text-[22px] mt-1 text-gray-400" />
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
  );
};

export default ActionsList;
