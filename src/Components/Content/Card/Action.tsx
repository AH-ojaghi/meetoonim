import React, { useEffect, useState } from "react";

interface ActionProps {
  img: JSX.Element;
  text: string;
  id: number;
}

const Action: React.FC<ActionProps> = ({ img, text, id }) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeData, setLikeData] = useState<any>(null);

  const postActionHandler = () => {
    console.log(id);
    setIsLike(!isLike);
  };


  useEffect(() => {
    const updateLikeStatus = async () => {
      if (isLike && text === 'بسندیدن') {
        const myHeaders = new Headers({
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVldG9vbmltLmNvbS9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE3MjE4MTg5MzksImV4cCI6MTcyNjYxODkzOSwibmJmIjoxNzIxODE4OTM5LCJqdGkiOiIzSFQxZGZPVjBwQ1RueGtEIiwic3ViIjoiMjE4OTIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0._CB_jA6y_DeocZXO7CXZ-lksqXq19t1F-qgModRDzBM"
        });
  
        try {
          const response = await fetch(`https://meetoonim.com/api/v1/posts/${id}/like`, {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify({}),
            redirect: "follow"
          });
  
          if (!response.ok) {
            const errData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errData.message}`);
          }
  
          const result = await response.json();
          setLikeData(result.data);
        } catch (error) {
          console.error("Error:", error.message);
        }
      }
    };
  
    updateLikeStatus();
  }, [isLike]);
  


  return (
    <div
      className="grid gap-y-1 justify-items-center"
      onClick={postActionHandler}
    >
      <div>{img}</div>
      <p className="font-bold">{text}</p>
    </div>
  );
};

export default Action;
