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
  l_name:string;
 
  open_to_imageComments:string;
  id_comments:string;
  id_user:string;
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
    <div className="md:w-full">
      {comment && likes_countComments && created_at && f_name && l_name && (
        <>
          <div className=" flex justify-center gap-3 items-center mb-2">
            {open_to_imageComments ? (
              <img
                src={
                  open_to_imageComments
                    ? `https://meetoonim.com/${open_to_imageComments}`
                    : "/"
                }
                className="bg-blue-400 w-10 h-10 rounded-full"
              />
            ) : (
              <VscAccount />
            )}

            <div className="w-[500px] h-[60px]  rounded-[10px] flex gap-[270px]  bg-[#f5f5f5]">
              <div className="flex  flex-col mr-2  justify-center">
                <div className="flex items-center justify-center">
                  <p className="text-black/90 flex gap-1 text-[#444444] items-center justify-center">
                    {f_name}
                    <p>{l_name}</p>
                    <div>
                      <TbPointFilled className="text-[#9e9e9e] w-3/4 h-3/4" />
                    </div>
                  </p>
                  <p className="text-[10px] text-[#9e9ec1] font-B">
                    {created_at}
                  </p>
                </div>

                <div className="flex">
                  <p className="text-[11px]">{comment}</p>
                </div>
              </div>
              <div
                onClick={() => toggleFavorite}
                className="flex items-center  mb-2 gap-3"
              >
                <p className="font-B text-[#9e9ec1]">{likes_countComments}</p>
                <div>
                  {favoriteIndex ? (
                    <FcLike className="w-3" />
                  ) : (
                    <FaRegHeart className="w-3" />
                  )}
                </div>
              </div>
            </div>
          </div>
          {id_comments.includes(id_user) ? (
            <div className="flex gap-[450px]">
              <div className="flex w-[120px] text-[#9797bd] text-sm justify-center mb-1">
                <button>پاسخ</button>
              </div>
              <div className="dropdown relative  inline-block">
                <button
                  onClick={() => {
                    toggleDropdownnn();
                  }}
                  className="dropbtn rounded focus:outline-none text-start"
                >
                  <BsThreeDots />
                </button>
                <div
                  id="myDropdown"
                  className={`dropdown z-10 absolute w-36 mt-2 left-0 bg-white border border-gray-200 rounded shadow-lg transition-all duration-500 ${
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
