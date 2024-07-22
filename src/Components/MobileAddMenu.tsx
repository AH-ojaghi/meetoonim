import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { TbShoppingBagPlus } from "react-icons/tb";
import { PiNoteBold } from "react-icons/pi";
import { IoIosBook } from "react-icons/io";

function MobileAddMenu() {
  const [isScrollY, setIsScrollY] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const bottunMenuRef = useRef(null);
  const itemMenuBoxRef = useRef(null);
  const jobRef = useRef(null);
  const postRef = useRef(null);
  const projectRef = useRef(null);
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
      bottunMenuRef.current.style.display = "none";
    } else {
      if (bottunMenuRef.current) {
        bottunMenuRef.current.style.display = "block";
        if (isScrollY) {
          bottunMenuRef.current.style.transition = "all 300ms";
          setTimeout(() => {
            bottunMenuRef.current.style.opacity = "100";
          }, 300);
          setTimeout(() => {
            bottunMenuRef.current.style.display = "block";
          }, 600);
        } else {
          setTimeout(() => {
            bottunMenuRef.current.style.opacity = "0";
          }, 300);
          setTimeout(() => {
            bottunMenuRef.current.style.display = "none";
          }, 600);
        }
      }
    }
  }, [isScrollY]);

  const itemMenuHandler = function () {
    setShowMenu((prev) => !prev); //chang show menu
    if (showMenu === true) {
      itemMenuBoxRef.current.style.display = "grid";
      window.onscroll = function () { window.scrollTo(0, 0); };
      //projectRef
      setTimeout(() => {
        projectRef.current.style.marginRight = "0rem";
        projectRef.current.style.opacity = "100";
      }, 450);
      //postRef
      setTimeout(() => {
        postRef.current.style.marginRight = "0rem";
        postRef.current.style.opacity = "100";
      }, 450);
      //jobRef
      setTimeout(() => {
        jobRef.current.style.marginRight = "0rem";
        jobRef.current.style.opacity = "100";
      }, 450);
    }
    if (showMenu === false) {
      //projectRef
      projectRef.current.style.marginRight = "28rem";
      projectRef.current.style.opacity = "0";
      //postRef
      postRef.current.style.marginRight = "14rem";
      postRef.current.style.opacity = "0";
      //jobRef
      jobRef.current.style.marginRight = "7rem";
      jobRef.current.style.opacity = "0";
      ////
      setTimeout(() => {
        itemMenuBoxRef.current.style.display = "none";
        window.onscroll=function(){};

      }, 450);
    }
  };
  

  //
  return (
    <div className="  md:hidden block">
      <div
        ref={bottunMenuRef}
        onClick={itemMenuHandler}
        className={`rounded-full  bg-sky-400 p-[19.5px] fixed duration-300 ${
          isScrollY ? "opacity-100" : "opacity-0"
        } bottom-[76px] right-[14px]`}
      >
        <FaPlus className="text-lg text-white" />
      </div>
      <div
        ref={itemMenuBoxRef}
        className=" text-white text-[1rem] rounded-lg fixed z-50 bottom-[9rem] hidden duration-300 right-[16px] w-full gap-y-[10px]"
      >
        <div
          ref={projectRef}
          className={`bg-sky-400 flex w-fit rounded-full px-[21.7px] gap-x-[9.5px] py-[3.5px] mr-[20rem] ease-in-out duration-[400ms]`}
          style={{ opacity: "0", marginRight: "28rem" }}
        >
          <p>پروژه</p>
          <IoIosBook className="text-[1.6rem]" />
        </div>
        <div
          ref={postRef}
          className={`bg-sky-400 flex w-fit rounded-full px-[21.7px] gap-x-[9.5px] py-[3.5px] mr-[20rem] ease-in-out duration-[400ms]`}
          style={{ opacity: "0", marginRight: "14rem" }}
        >
          <p>پست</p>
          <PiNoteBold
            className="text-[1.6rem]"
            style={{ transform: "rotateX(180deg)" }}
          />
        </div>
        <div
          ref={jobRef}
          className={`bg-sky-400 flex w-fit rounded-full px-[21.7px] gap-x-[9.5px] py-[3.5px] mr-[20rem] ease-in-out duration-[400ms]`}
          style={{ opacity: "0", marginRight: "7rem" }}
        >
          <p>شغل</p>
          <TbShoppingBagPlus
            className="text-[1.6rem]"
            style={{ transform: "rotateY(180deg)" }}
          />
        </div>
      </div>
    </div>
  );
}

export default MobileAddMenu;
