import React, { useEffect, useRef, useState } from "react";
import { FcLike } from "react-icons/fc";
//
interface ActionProps {
  img: JSX.Element;
  data: object;
  text: string;
  id: number;
}

const Action: React.FC<ActionProps> = ({ img, data, text, id }) => {
  const [isLikedPost, setIsLikedPost] = useState<boolean>(false);
  const [likeData, setLikeData] = useState(null);
  const [resLikeData, setResLikeData] = useState<boolean>();
  const actionIconRef = useRef(null);
  const likedPostIconRef = useRef(null);
  //
  const postActionHandler = (event) => {
    const actionName = event.currentTarget.outerText;

    if (actionName === "بسندیدن") {
      setIsLikedPost(!isLikedPost);
    } else if (actionName === "ذخیره") {
      console.log("d");
      console.log("save");
    }
  };
  //
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVldG9vbmltLmNvbS9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE3MjE4MTg5MzksImV4cCI6MTcyNjYxODkzOSwibmJmIjoxNzIxODE4OTM5LCJqdGkiOiIzSFQxZGZPVjBwQ1RueGtEIiwic3ViIjoiMjE4OTIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0._CB_jA6y_DeocZXO7CXZ-lksqXq19t1F-qgModRDzBM"
    );

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://meetoonim.com/api/v1/posts/${id}/like`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((rawText) => {
        rawText;
        try {
          const result = JSON.parse(rawText);
          if (result.message === "Like added successfully!") {
            setResLikeData(true);
          } else {
            setResLikeData(false);
          }
        } catch (parseError) {
          console.error("Failed to parse JSON:", parseError);
          setResLikeData(false);
        }
      })
      .catch((error) => console.error(error));
  }, [isLikedPost]);

  const likeIconHandler = function () {
    if (resLikeData && text === "بسندیدن") {
      actionIconRef.current?.classList.add("hidden");
      likedPostIconRef.current?.classList.remove("hidden");
    } else {
      actionIconRef.current?.classList.remove("hidden");
      likedPostIconRef.current?.classList.add("hidden");
    }
  }();
  //
  return (
    <div
      className="grid gap-y-1 justify-items-center"
      onClick={postActionHandler}
    >
      <div>
        <div className="" ref={actionIconRef}>
          {img}
        </div>
        {text === "بسندیدن" ? (
          <div ref={likedPostIconRef} className=" hidden">
            <FcLike className="text-[20px] -mt-[2px]" />
          </div>
        ) : (
          ""
        )}
      </div>
      <p className="font-bold">{text}</p>
    </div>
  );
};

export default Action;
