import { useEffect, useState } from "react";
import Card from "./Card";



export default function Content() {
  const [data, setData] = useState<any[]>([]);


  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbWVldG9vbmltLmNvbS9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE3MjEyMTU4MjcsImV4cCI6MTcyNjAxNTgyNywibmJmIjoxNzIxMjE1ODI3LCJqdGkiOiJpN3pPRlRXUnZUN2xkV2hNIiwic3ViIjoiMjE4OTIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.HQtTBA6rBRSM_IwglUvM6JGdFF4VQrAuyRkcvWa7d5I"
    );

    fetch("https://meetoonim.com/api/v1/posts/?page=1", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="w-full md:w-[59%] lgs:w-[64%] md:px-3 lg:w-[46.6%] xl:w-[53%]">
      {data.map((card) => (
        <Card
          description={card.description}
          created_at={card.comments.map((item:any) => item.created_at).join(", ")}
          f_name={card.user.f_name}
          l_name={card.user.l_name}
          open_to_image={card.user.open_to_image}
          thumbnail={card.media.map((item:any)=>item.thumbnail).join(",")}
          comments_count={card.comments_count}
          likes_count={card.likes_count}
          comment={card.comments.map((item:any)=>item.comment)}
          likes_countComments ={card.comments.map((item:any)=>item.likes_count)}
          open_to_imageComments= {card.comments.map((item:any)=>item.user.open_to_image)}
          id_user={card.user.id}
          id_comments= {card.comments.map((item:any)=>item.user.id)}
        />
      ))}
    </div>
  );
}

{/* <Card
  logo="/vite.svg"
  companyName="کارگزاری مفید"
  time="11 ماه پیش"
  postText="پیشرفت مداوم را با کارگزاری مفید تجربه کنید."
  actions={cardItems}
/>
<Card
  logo="/vite.svg"
  companyName="کارگزاری مفید"
  time="11 ماه پیش"
  postText="پیشرفت مداوم را با کارگزاری مفید تجربه کنید."
  actions={cardItems}
/>
<Card
  logo="/digiKala.png"
  companyName="دیجی کالا"
  time="7 ماه پیش"
  postText="پیشرفت مداوم را با دیجی کالا تجربه کنید."
  image="/akhenaten.jpg"
  commentsCount="3 نظر"
  actions={cardItems}
>
  <Comment
    logo="/vite.svg"
    username="علی کاظمی"
    time="6 ماه پیش"
    text="خیلی هم عالی"
  />
</Card>
<Card
  logo="/digiKala.png"
  companyName="دیجی کالا"
  time="7 ماه پیش"
  postText="پیشرفت مداوم را با دیجی کالا تجربه کنید."
  image="/akhenaten.jpg"
  commentsCount="3 نظر"
  actions={cardItems}
>
  <Comment
    logo="/vite.svg"
    username="علی کاظمی"
    time="6 ماه پیش"
    text="خیلی هم عالی"
  />
</Card> */}