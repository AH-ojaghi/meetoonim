import React, { useEffect, useRef } from "react";
import { FcLike, FcBookmark } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  likePostAsync,
  likePost,
  savePostAsync,
  removeBookmarkAsync,
} from "../../../redux/postActionSlice";

interface ActionProps {
  img: JSX.Element;
  text: string;
  id: number;
}

const Action: React.FC<ActionProps> = ({ img, text, id }) => {
  const actionIconRef = useRef<HTMLDivElement>(null);
  const activeIconRef = useRef<HTMLDivElement>(null);
  const postAction = useSelector((state: any) => state.postAction);
  const dispatch = useDispatch();
  //

  const postActionHandler = () => {
    if (text === "بسندیدن") {
      dispatch(likePostAsync(id));
      dispatch(likePostAsync(id));
    }
    console.log(postAction[0]);
  };

  //
  return (
    <div
      className="grid gap-y-1 justify-items-center"
      onClick={postActionHandler}
    >
      <div>
        <Link to={text === "نظرات" ? `/posts/${id}` : ""}>
          <div ref={actionIconRef}>{img}</div>
          {text === "بسندیدن" && (
            <div ref={activeIconRef} className="hidden">
              <FcLike className="text-[20px] -mt-[2px]" />
            </div>
          )}
          {text === "ذخیره" && (
            <div ref={activeIconRef} className="hidden">
              <FcBookmark className="text-[20px] -mt-1" />
            </div>
          )}
        </Link>
      </div>
      <p className="font-bold">{text}</p>
    </div>
  );
};

export default Action;

///////////////
// const post = postAction.find((post: any) => post.id === id);
// const postMessage = postAction.find((post: any) => post.id === id)?.message;

//////////////
// useEffect(() => {
//   const post = postAction.find((post: any) => post.id === id);

//   if (text === "بسندیدن") {
//     if (post?.isLiked) {
//       actionIconRef.current?.classList.add("hidden");
//       activeIconRef.current?.classList.remove("hidden");
//     } else {
//       actionIconRef.current?.classList.remove("hidden");
//       activeIconRef.current?.classList.add("hidden");
//     }
//   } else if (text === "ذخیره") {
//     if (post?.isBookmarked) {
//       actionIconRef.current?.classList.add("hidden");
//       activeIconRef.current?.classList.remove("hidden");
//     } else {
//       actionIconRef.current?.classList.remove("hidden");
//       activeIconRef.current?.classList.add("hidden");
//     }
//   }
// }, [postAction, id, text]);
