import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  IoCloseOutline,
  IoEarthSharp,
  IoSendSharp,
  IoHeartCircle,
} from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { FaRegBookmark, FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import { MdOutlineIosShare } from "react-icons/md";
import Slider from "../Slider";
import Action from "../../Components/Content/Card/Action";
import Comment from "../../Components/Content/Comment";
import ActionsList from "../../Components/Content/Card/ActionsList";

function CommentsModal() {
  const [data, setData] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const { id: postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://meetoonim.com/api/v1/posts/?page=1",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVldG9vbmltLmNvbS9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE3MjEyMTU4MjcsImV4cCI6MTcyNjAxNTgyNywibmJmIjoxNzIxMjE1ODI3LCJqdGkiOiJpN3pPRlRXUnZUN2xkV2hNIiwic3ViIjoiMjE4OTIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.HQtTBA6rBRSM_IwglUvM6JGdFF4VQrAuyRkcvWa7d5I",
            },
          }
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const postData = data.find((item) => item.id === parseInt(postId));
  const thumbnails = postData?.media.map((item) => item.thumbnail) || [];
  const userCommentNames =
    postData?.comments.map(
      (item) => `${item.user.f_name} ${item.user.l_name}`
    ) || [];

  const cardItems = [
    {
      img: <FaRegHeart className="text-gray-500/95 text-[18px]" />,
      label: "بسندیدن",
    },
    {
      img: <FaRegCommentAlt className="text-gray-500/95 text-[16px]" />,
      label: "نظرات",
    },
    {
      img: (
        <MdOutlineIosShare className="text-gray-500/95 text-[20px] -mt-[2px]" />
      ),
      label: "اشتراک گذاری",
    },
    {
      img: <FaRegBookmark className="text-gray-500/95 text-[16px]" />,
      label: "ذخیره",
    },
  ];

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now - date;

    const diffInSeconds = diffInMilliseconds / 1000;
    if (diffInSeconds < 60) return `${Math.floor(diffInSeconds)} ثانیه پیش`;

    const diffInMinutes = diffInSeconds / 60;
    if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)} دقیقه پیش`;

    const diffInHours = diffInMinutes / 60;
    if (diffInHours < 24) return `${Math.floor(diffInHours)} ساعت پیش`;

    const diffInDays = diffInHours / 24;
    if (diffInDays < 7) return `${Math.floor(diffInDays)} روز پیش`;

    const diffInWeeks = diffInDays / 7;
    if (diffInWeeks < 4) return `${Math.floor(diffInWeeks)} هفته پیش`;

    const diffInMonths = diffInDays / 30;
    if (diffInMonths < 12) return `${Math.floor(diffInMonths)} ماه پیش`;

    const diffInYears = diffInMonths / 12;
    return `${Math.floor(diffInYears)} سال پیش`;
  };

  const newCommentHandler = async () => {
    if (commentValue) {
      try {
        const response = await fetch(
          `https://meetoonim.com/api/v1/comments/${postId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVldG9vbmltLmNvbS9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE3MjE4MTg5MzksImV4cCI6MTcyNjYxODkzOSwibmJmIjoxNzIxODE4OTM5LCJqdGkiOiIzSFQxZGZPVjBwQ1RueGtEIiwic3ViIjoiMjE4OTIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0._CB_jA6y_DeocZXO7CXZ-lksqXq19t1F-qgModRDzBM",
            },
            body: JSON.stringify({ comment: commentValue }),
          }
        );
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    setCommentValue("");
  };

  return (
    <div className="bg-black/40 w-full h-full fixed inset-0 z-50">
      <div className="bg-gray-50 max-w-[602px] relative w-full h-screen mx-auto md:top-5 md:h-[93.35%] overflow-scroll hidden_scrollbar rounded-lg sm:mx-auto">
        <div className="bg-white flex items-center py-[9px] fixed w-full max-w-[602px] z-50 rounded-t-lg">
          <IoCloseOutline className="text-[27px] mr-[16.5px]" />
          <div className="flex gap-3 mr-[29px]">
            <img
              src={
                postData?.user.open_to_image
                  ? `https://meetoonim.com/${postData.user.open_to_image}`
                  : "/profile.jpg"
              }
              alt={postData?.user.open_to_image || "user"}
              width="48px"
              className="rounded-full"
            />
            <div className="flex justify-center items-center flex-col">
              <p className="text-black/90 flex">
                {postData?.user.f_name}
                <p>{postData?.user.l_name}</p>
              </p>
              <div className="flex justify-center items-center gap-[2px]">
                <p className="text-[0.6rem] text-slate-400">
                  {getRelativeTime(postData?.created_at)}
                </p>
                <GoDotFill className="text-slate-400 text-[7px]" />
                <IoEarthSharp className="text-slate-400 text-[10px]" />
              </div>
            </div>
          </div>
          <div className="hidden xs:block top-5 absolute left-5 sm:left-[17px]">
            <ActionsList />
          </div>
        </div>
        {thumbnails.length > 0 && (
          <div className="mt-[4.15rem]">
            <Slider
              thumbnail={thumbnails.join(",")}
              eachThumbnail={thumbnails}
            />
          </div>
        )}
        <p
          className={`mr-4 mt-[75px] mb-0 text-slate-600 text-[15px] ${
            thumbnails.length > 0 ? "hidden" : ""
          }`}
        >
          {postData?.description}
        </p>
        <div
          className={`flex items-center px-[35px] sm:px-[61.5px] xs:px-[40px] justify-between mt-2 text-gray-400 text-[10px] ${
            !thumbnails.length && "border-t-2 pt-2"
          }`}
        >
          {cardItems.map((item, index) => (
            <Action
              key={index}
              img={item.img}
              text={item.label}
              id={postId}
              data={postData}
            />
          ))}
        </div>
        <div className="w-full my-3 flex justify-between px-[15px] text-[11px] text-gray-400 items-center">
          <div className="flex justify-center items-center gap-x-[2px]">
            <IoHeartCircle className="text-sky-400 text-xl" />
            <p>{userCommentNames.join(", ")}</p>
          </div>
          <p>{postData?.comments_count} نظر</p>
        </div>
        <p
          className={`mr-4 mb-8 text-slate-600 text-[15px] ${
            thumbnails.length === 0 ? "hidden" : ""
          }`}
        >
          {postData?.description}
        </p>
        <div className="mb-16">
          <Comment
            comment={postData?.comments.map((item) => item.comment)}
            likes_countComments={postData?.comments.map(
              (item) => item.likes_count
            )}
            created_at={postData?.comments
              .map((item) => item.created_at)
              .join(", ")}
            f_name={postData?.user.f_name}
            l_name={postData?.user.l_name}
            open_to_imageComments={postData?.comments.map(
              (item) => item.user.open_to_image
            )}
            id_comments={postData?.comments.map((item) => item.user.id)}
            id_user={postData?.user.id}
          />
        </div>
        <div className="bg-white fixed z-50 bottom-0 md:bottom-4 w-full max-w-[602px] flex pr-3 justify-center py-3 items-center border-2 border-gray-200 text-slate-600 rounded-lg">
          <input
            type="text"
            className="outline-none leading-4 text-[15px] resize-none w-full overflow-y-clip"
            placeholder="نظر خود را بنویسید"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <IoSendSharp
            className="rotate-180 mx-2 text-slate-400 text-2xl"
            onClick={newCommentHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default CommentsModal;
