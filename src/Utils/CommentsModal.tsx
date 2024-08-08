import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoEarthSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import Slider from "./Slider";
import Action from "../components/Content/Card/Action";
import Comment from "../components/Content/Comment";
import { IoSendSharp } from "react-icons/io5";
import { FaRegBookmark, FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import { MdOutlineIosShare } from "react-icons/md";
import { IoHeartCircle } from "react-icons/io5";
import ActionsList from "../components/Content/Card/ActionsList";
import { useAppSelector } from "../Redux/hooks";
import { useDispatch } from "react-redux";
import { RiH1 } from "react-icons/ri";
//
function CommentsModal() {
  const [data, setData] = useState<any[]>([]);
  const [updateCommentData, setUpdateCommentData] = useState(true);
  const [commentValue, setCommentValue] = useState<any[]>();
  const postId = useParams();
  const getCommentData = useAppSelector((state) => state.commentAction);
  const dispatch = useDispatch();
  // get comment data

  // console.log(getCommentData.data ,'commments --Data');

  //

  let postData = [],
    thumbnail = [],
    eachThumbnail = [],
    userComment = [];
  const isLoading = getCommentData.loading; // if isLoading = false => show data (fulfiled)
  console.log(isLoading);

  if (isLoading === false) {
    postData = getCommentData?.data;
    thumbnail = postData?.media.map((item: any) => item.thumbnail).join(",");
    eachThumbnail = thumbnail ? thumbnail.split(",") : [];
    //
    userComment = postData?.comments.map(
      (item) => `${item.user.f_name} ${item.user.l_name}`
    );
  }

  //
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

  //
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now - date;

    const diffInSeconds = diffInMilliseconds / 1000;
    if (diffInSeconds < 60) {
      return `${Math.floor(diffInSeconds)} ثانیه پیش`;
    }

    const diffInMinutes = diffInSeconds / 60;
    if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)} دقیقه پیش`;
    }

    const diffInHours = diffInMinutes / 60;
    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} ساعت پیش`;
    }

    const diffInDays = diffInHours / 24;
    if (diffInDays < 7) {
      return `${Math.floor(diffInDays)} روز پیش`;
    }

    const diffInWeeks = diffInDays / 7;
    if (diffInWeeks < 4) {
      return `${Math.floor(diffInWeeks)} هفته پیش`;
    }

    const diffInMonths = diffInDays / 30;
    if (diffInMonths < 12) {
      return `${Math.floor(diffInMonths)} ماه پیش`;
    }

    const diffInYears = diffInMonths / 12;
    return `${Math.floor(diffInYears)} سال پیش`;
  };
  //
  //Post data
  const newCommentHandler = function (e) {
    if (commentValue) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVldG9vbmltLmNvbS9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE3MjE4MTg5MzksImV4cCI6MTcyNjYxODkzOSwibmJmIjoxNzIxODE4OTM5LCJqdGkiOiIzSFQxZGZPVjBwQ1RueGtEIiwic3ViIjoiMjE4OTIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0._CB_jA6y_DeocZXO7CXZ-lksqXq19t1F-qgModRDzBM"
      );
      myHeaders.append(
        "Cookie",
        "XSRF-TOKEN=eyJpdiI6ImhQS3pVT3FZUTl3ZEJZMUNKd05jTWc9PSIsInZhbHVlIjoiMmtIK2JyWTZLUGpGUm4vQWpsQklRa3loRElFbWFPU2pEcWlZN29LR3NOYnphcWdqd0xlSE1oaXQrclY2ZUhKc2M3NUJOczJDTXFMcHRFdGgxaytIa3QwTEFDWUVxSENld1JVN3J1MjcwMGlGRVpzMzhzWFlVSFR5cG5iUDJkc0MiLCJtYWMiOiJkOWUyNWY0OTA0ODE0ODRlNTA1MTA0ZmIzZGQzMGU4MzA3NzdmOTZiZTFjZjdhNjY0YmJmODdkNWQ0YzFlNmZhIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IlIzdEoxc2FyNGNlbDdNWkJqQ1hGcmc9PSIsInZhbHVlIjoiUDF5cVAyaDBGeFhmWUNaZmE1TW5wS3VuY1NzaDFSQURaZFErOTdhRDVLYm14b0p5MUM2Ly9DSU9xRlNGbHJBbWhMNjU2UkFNeGNFMnNYa3BWWWJYakp0dW8rUGdzS2RPUmZWTFpZU1FpYWdFQXAyN2VieEFTMTVUc1d4NWtGNXIiLCJtYWMiOiIzYWYxMDQ3ZGY4Y2Y0MjNjZTJkODc0YmVlODY0ZDk2YmY5YjZjNzIzMmViZmI3NzM5NmU4MjMzODIxZGFkZjMxIiwidGFnIjoiIn0%3D"
      );

      const raw = JSON.stringify({
        comment: commentValue,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `https://meetoonim.com/api/v1/comments/${postId.id}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    }
    setUpdateCommentData(!updateCommentData);
    // empty input comment
    setCommentValue("");
  };
  //
  //
  //
  //
  //
  //
  return (
    <>
      {isLoading ? (
        <h1>Loading ...</h1>
      ) : (
        <div className=" bg-black/40 w-full h-full  fixed inset-0 z-50 ">
          <div className=" bg-gray-50 max-w-[602px] relative w-full h-screen mx-auto  md:top-5 md:h-[93.35%]  overflow-scroll hidden_scrollbar rounded-lg sm:mx-auto">
            {/* Header */}
            <div className="bg-white flex flex-wrap items-center py-[9px] fixed w-full  max-w-[602px] z-50 rounded-t-lg">
              <IoCloseOutline className="text-[27px] mr-[16.5px]" />
              <div className="flex gap-3 mr-[29px] ">
                <img
                  src={
                    postData?.user.open_to_image
                      ? `https://meetoonim.com/${postData.user.open_to_image}`
                      : "/profile.jpg"
                  }
                  alt={postData?.user.open_to_image || "user"}
                  // src="/"
                  // alt="/"
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
            {/* image / images */}
            {thumbnail && (
              <div className="mt-[4.15rem]">
                <Slider thumbnail={thumbnail} eachThumbnail={eachThumbnail} />
              </div>
            )}
            {/* Description - if image post == false */}
            <p
              className={`mr-4 mt-[75px] mb-0 text-slate-600 text-[15px] ${
                thumbnail && "hidden"
              }`}
            >
              {postData?.description}
            </p>
            {/* Actions */}
            <div
              className={`flex items-center px-[35px] sm:px-[61.5px] xs:px-[40px] justify-between  mt-2 text-gray-400 text-[10px] ${
                !thumbnail && "border-t-2 pt-2"
              }`}
            >
              {cardItems.map((item, index) => (
                <div key={crypto.randomUUID()}>
                  <Action
                    img={item?.img}
                    text={item?.label}
                    id={postId?.id}
                    data={postData}
                  />
                </div>
              ))}
            </div>
            {/* likes and replay */}
            <div className="w-full my-3 flex justify-between px-[15px] text-[11px] text-gray-400  items-center">
              <div className="flex justify-center items-center gap-x-[2px]">
                <IoHeartCircle className="text-sky-400 text-xl" />
                <p>
                  {userComment?.[0]}

                  {userComment?.length > 0 ? ` و ...` : ""}
                </p>
              </div>
              <p>{postData?.comments_count} نظر</p>
            </div>
            {/* Description - if image post == true */}
            <p
              className={`mr-4 mb-8 text-slate-600 text-[15px] ${
                !thumbnail && "hidden"
              }`}
            >
              {postData?.description}
            </p>
            {/* Comments */}
            <div className="mb-16">
              {postData?.comments?.map((item: any) => (
                <Comment
                  key={crypto.randomUUID()}
                  comment={item?.comment}
                  likes_countComments={item?.likes_count}
                  created_at={item?.created_at}
                  f_name={item?.user.f_name}
                  l_name={item?.user.l_name}
                  open_to_imageComments={
                    item?.user.open_to_image
                      ? item?.user.open_to_image
                      : item?.user.avatar
                  }
                  id_comments={item?.id}
                  comment_user_id={item?.user.id}
                  id_user={item?.id}
                />
              ))}
            </div>

            {/* send comment */}
            <div className="bg-white fixed z-50 bottom-0 md:bottom-4  w-full max-w-[602px] flex pr-3 justify-center py-3 items-center  border-2 border-gray-200 text-slate-600 rounded-lg ">
              <input
                type="text"
                className=" outline-none leading-4 text-[15px] resize-none w-full overflow-y-clip"
                placeholder="نظر خود را بنویسید"
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
              />
              <IoSendSharp
                className=" rotate-180 mx-2 text-slate-400 text-2xl"
                onClick={newCommentHandler}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CommentsModal;
