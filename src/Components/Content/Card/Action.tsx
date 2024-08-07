import React, { useEffect, useRef } from "react";
import { FcLike, FcBookmark } from "react-icons/fc";
import Routes from "../../../utils/routing/routes";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { likePostAsyncAction } from "../../../Redux/dashboard/post/like/likePostAction";
import { useAppSelector } from "../../../Redux/hooks";
import { savePostAsyncAction } from "../../../Redux/dashboard/post/save/savePostAction";

interface ActionProps {
  img: JSX.Element;
  text: string;
  id: number;
}

const Action: React.FC<ActionProps> = ({ img, text, id }) => {
  // console.log('console.log', id);

  const actionIconRef = useRef<HTMLDivElement>(null);
  const activeIconRef = useRef<HTMLDivElement>(null);
  const likePostActionSlice = useAppSelector(
    (state: any) => state.likePostAction
  );
  const savePostActionSlice = useAppSelector(
    (state: any) => state.savePostAction
  );
  const dispatch = useDispatch();
  //

  const postActionHandler = () => {
    if (text === "بسندیدن") {
      dispatch(likePostAsyncAction(id));
    }
    if (text === "ذخیره") {
      dispatch(savePostAsyncAction(id));
    }
  };
  //

  const isLikePost = likePostActionSlice.isLike;
  const isBookmarked = savePostActionSlice.isBookmarked;
  //
  useEffect(() => {
    if (text === "بسندیدن") {
      if (isLikePost) {
        actionIconRef.current?.classList.add("hidden");
        activeIconRef.current?.classList.remove("hidden");
      } else {
        actionIconRef.current?.classList.remove("hidden");
        activeIconRef.current?.classList.add("hidden");
      }
    }
    if (text === "ذخیره") {
      if (isBookmarked) {
        actionIconRef.current?.classList.add("hidden");
        activeIconRef.current?.classList.remove("hidden");
      } else {
        actionIconRef.current?.classList.remove("hidden");
        activeIconRef.current?.classList.add("hidden");
      }
    }
  }, [isBookmarked, isLikePost, likePostActionSlice, text]);
  //
  // console.log("console.log", id);
  // console.log("console.log", Routes.CommentsModal(id).path);

  return (
    <div
      className="grid gap-y-1 justify-items-center"
      onClick={postActionHandler}
    >
      <div>
        <Link
          to={text === "نظرات" ? Routes.CommentsModal(id).path : ""}
          onClick={() => console.log(id ,'console.log --ID --action.tsx')}
        >
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
