import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { TbPointFilled } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";

export default function Comment({
  comment,
  likes_countComments,
  created_at,
  f_name,
  l_name,

  open_to_imageComments,
  id_comments,
  id_user,
}: {
  comment: string;
  likes_countComments: string;
  created_at: string;
  f_name: string;
  l_name: string;

  open_to_imageComments: string;
  id_comments: string;
  id_user: string;
}) {
  const [open, setOpen] = useState(false);
  const [favoriteIndex, setFavoriteIndex] = useState<null | number>(null);
  const toggleFavorite = (index: null) => {
    setFavoriteIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const toggleDropdownnn = () => {
    setOpen(!open);
  };
  const MenuComment = [{ label: "حذف " }, { label: "ویرایش" }];
  return (
    <div className="md:w-full ">
      {comment && likes_countComments && created_at && f_name && l_name && (
        <>
          <div className=" flex justify-center gap-x-[7.5px] mt-[19px] items-center">
            {open_to_imageComments ? (
              <img
                src={
                  open_to_imageComments
                    ? `https://meetoonim.com/${open_to_imageComments}`
                    : "/"
                }
                className=" -mt-7 w-9 h-9 rounded-full"
              />
            ) : (
              <VscAccount />
            )}

            <div className=" h-[53px]  rounded-[10px] flex w-[70.8%] xs:w-[77%] sm:w-[86.4%] md:w-[79%] xl:w-[86%] bg-[#f5f5f5] mb-2">
              <div className="flex  flex-col ml-[17px] mr-3 w-full  justify-center">
                <div className="flex w-full justify-between items-center">
                  <div className="flex">
                    <p className="text-black/90 flex gap-1 text-[#444444] items-center text-xs justify-center">
                      {f_name}
                      <p>{l_name}</p>
                      <div>
                        <TbPointFilled className="text-[#9e9e9e] w-3/4 h-3/4" />
                      </div>
                    </p>
                    <p className="text-[10px] text-[#9e9ec1]">{created_at}</p>
                  </div>

                  <div
                    onClick={() => toggleFavorite}
                    className="flex items-center gap-[6px]"
                  >
                    <p className="font-B text-[#9e9ec1]">
                      {likes_countComments}
                    </p>
                    <div>
                      {favoriteIndex ? (
                        <FcLike className="w-3" />
                      ) : (
                        <FaRegHeart className="w-3" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <p className="text-[15px]">{comment}</p>
                </div>
              </div>
            </div>
          </div>
          {id_comments.includes(id_user) ? (
            <div className="flex">
              <div className="flex text-[#9797bd] text-xs w-10/12 xs:w-full   ">
                <button className="mr-[74px] h-fit ">پاسخ</button>
              </div>
              <div className="dropdown relative  inline-block">
                <button
                  onClick={() => {
                    toggleDropdownnn();
                  }}
                  className="dropbtn rounded focus:outline-none text-start ml-[41.85px] text-gray-500 text-xl"
                >
                  <BsThreeDots />
                </button>
                <div
                  id="myDropdown"
                  className={`dropdown z-10 absolute  mt-2 left-0 bg-white border border-gray-200 rounded shadow-lg transition-all duration-500 ${
                    open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  {MenuComment.map((item, index) => (
                    <a
                      key={index}
                      className="block px-4 py-2 text-black hover:bg-gray-200"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}
