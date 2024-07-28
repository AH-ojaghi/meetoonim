import React, { useEffect, useRef, useState } from "react";
import { FcLike, FcBookmark } from "react-icons/fc";

interface ActionProps {
  img: JSX.Element;
  text: string;
  id: number;
}

const Action: React.FC<ActionProps> = ({ img, text, id }) => {
  const [isActionActive, setIsActionActive] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<boolean | undefined>();
  const actionIconRef = useRef<HTMLDivElement>(null);
  const activeIconRef = useRef<HTMLDivElement>(null);

  const postActionHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const actionName = event.currentTarget.textContent;

    if (actionName === "بسندیدن" || actionName === "ذخیره") {
      setIsActionActive((prevState) => !prevState);
      const actionType = actionName === "بسندیدن" ? "like" : "save";
      performAction(actionType);
    }
  };

  const performAction = (actionType: "like" | "save") => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVldG9vbmltLmNvbS9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE3MjE4MTg5MzksImV4cCI6MTcyNjYxODkzOSwibmJmIjoxNzIxODE4OTM5LCJqdGkiOiIzSFQxZGZPVjBwQ1RueGtEIiwic3ViIjoiMjE4OTIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0._CB_jA6y_DeocZXO7CXZ-lksqXq19t1F-qgModRDzBM"
    );

    const requestOptions: RequestInit = {
      method: actionType === "like" ? "PUT" : "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    const url =
      actionType === "like"
        ? `https://meetoonim.com/api/v1/posts/${id}/like`
        : `https://meetoonim.com/api/v1/bookmarks/${id}`;

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        const successMessage =
          actionType === "like"
            ? "Like added successfully!"
            : "Bookmark added successfully!";
        setResponseData(result.message === successMessage);
      })
      .catch(() => setResponseData(false));
  };

  useEffect(() => {
    if (responseData && (text === "بسندیدن" || text === "ذخیره")) {
      actionIconRef.current?.classList.add("hidden");
      activeIconRef.current?.classList.remove("hidden");
    } else {
      actionIconRef.current?.classList.remove("hidden");
      activeIconRef.current?.classList.add("hidden");
    }
  }, [responseData, text]);

  return (
    <div
      className="grid gap-y-1 justify-items-center"
      onClick={postActionHandler}
    >
      <div>
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
      </div>
      <p className="font-bold">{text}</p>
    </div>
  );
};

export default Action;
