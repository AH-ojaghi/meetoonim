import React from "react";
import Card from "./Card";
import Comment from "./Comment";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdOutlineIosShare } from "react-icons/md";

const cardItems = [
  { img: <FaRegHeart className="text-[18px]" />, label: "بسندیدن" },
  { img: <FaRegCommentAlt className="text-[16px]" />, label: "نظرات" },
  { img: <MdOutlineIosShare className="text-[20px] -mt-[2px]" />, label: "اشتراک گذاری" },
  { img: <FaRegBookmark className="text-[16px]" />, label: "ذخیره" },
];

export default function Content() {
  return (
    <div className=" w-full md:w-[59%] lgs:w-[64%] md:px-3 lg:w-[46.6%] xl:w-[53%] ">
      <Card
        logo="/vite.svg"
        companyName="کارگزاری مفید"
        time="11 ماه بیش"
        postText="بیشرفت مداوم را با کار گزاری مفید تجربه کنید."
        actions={cardItems}
      />      <Card
      logo="/vite.svg"
      companyName="کارگزاری مفید"
      time="11 ماه بیش"
      postText="بیشرفت مداوم را با کار گزاری مفید تجربه کنید."
      actions={cardItems}
    />
      <Card
        logo="/digiKala.png"
        companyName="دیجی کالا"
        time="7 ماه بیش"
        postText="بیشرفت مداوم را با دیجی کالا تجربه کنید."
        image="/akhenaten.jpg"
        commentsCount="3 نظر"
        actions={cardItems}
      >
        
        <Comment
          logo="/vite.svg"
          username="علی کاظمی"
          time="6 ماه بیش"
          text="خیلی هم عالی"
        />
      </Card> <Card
        logo="/digiKala.png"
        companyName="دیجی کالا"
        time="7 ماه بیش"
        postText="بیشرفت مداوم را با دیجی کالا تجربه کنید."
        image="/akhenaten.jpg"
        commentsCount="3 نظر"
        actions={cardItems}
      >
        
        <Comment
          logo="/vite.svg"
          username="علی کاظمی"
          time="6 ماه بیش"
          text="خیلی هم عالی"
        />
      </Card>
    </div>
  );
}
