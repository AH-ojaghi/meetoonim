import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";

function MobileAddMenu() {
 const [isScrollY, setIsScrollY] = useState(true);
 const bottunMenu = useRef(null);

 useEffect(() => {
 const handleScroll = () => {
 if (window.oldScroll > window.scrollY) {
 setIsScrollY(true);
 } else {
 setIsScrollY(false);
 }
 window.oldScroll = window.scrollY;
 };

 window.addEventListener('scroll', handleScroll);

 return () => {
 window.removeEventListener('scroll', handleScroll);
 };
 }, []);

 useEffect(() => {
 if (bottunMenu.current) {
 if (isScrollY) {
 bottunMenu.current.style.display = "block";
 } else {
 bottunMenu.current.style.display = "none";
 }
 }
 }, [isScrollY]);

 const mobileMenuHandler = function () {
 console.log("click");
 };

 return (
 <div
 ref={bottunMenu}
 className={`rounded-full md:hidden bg-sky-400 p-[19.5px] fixed transition-all duration-500 ${
 isScrollY ? "opacity-100" : "opacity-0"
 } bottom-[76px] right-[14px]`}
 onClick={mobileMenuHandler}
 >
 <FaPlus className="text-lg text-white" />
 </div>
 );
}

export default MobileAddMenu;