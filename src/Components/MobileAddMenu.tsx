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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth > 768) {
      bottunMenu.current.style.display = "none";
    } else {
      if (bottunMenu.current) {
        bottunMenu.current.style.display = "block";
        if (isScrollY) {
          bottunMenu.current.style.transition = "all 300ms";
          setTimeout(() => {
            //@ts-ignore
            bottunMenu.current.style.opacity = "100";
          }, 300);
          setTimeout(() => {
            //@ts-ignore
            bottunMenu.current.style.display = "block";
          }, 600);
        } else {
          setTimeout(() => {
            //@ts-ignore
            bottunMenu.current.style.opacity = "0";
          }, 300);
          setTimeout(() => {
            //@ts-ignore
            bottunMenu.current.style.display = "none";
          }, 600);
        }
      }
    }
  }, [isScrollY]);

  const mobileMenuHandler = function () {
    console.log("click");
  };

  return (
    <div className="  md:hidden block">
      <div
        ref={bottunMenu}
        className={`rounded-full  bg-sky-400 p-[19.5px] fixed duration-300 ${
          isScrollY ? "opacity-100" : "opacity-0"
        } bottom-[76px] right-[14px]`}
        onClick={mobileMenuHandler}
      >
        <FaPlus className="text-lg text-white" />
      </div>
      <div>
        <p>پروژه</p>
        <p>پست</p>
        <p>شغل</p>
      </div>
    </div>
  );
}

export default MobileAddMenu;
