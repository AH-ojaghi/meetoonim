// tests/Card.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../src/Components/Content/Card/Card";
import { FaRegBookmark, FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import { MdOutlineIosShare } from "react-icons/md";
import Slider from "../src/Utils/Slider";
import CardHeader from "../src/Components/Content/Card/CardHeader";
import Action from "../src/Components/Content/Card/Action";

jest.mock("../src/Utils/Slider", () => (props: any) => (
  <div data-testid="slider">{props.eachThumbnail.length} thumbnails</div>
));

jest.mock("../src/Components/Card/CardHeader", () => (props: any) => (
  <div data-testid="card-header">
    {props.f_name} {props.l_name} {props.created_at}
  </div>
));

jest.mock("../src/Components/Card/Action", () => (props: any) => (
  <div data-testid="action">
    {props.text} {props.img}
  </div>
));

describe("Card Component", () => {
  const defaultProps = {
    id: 96,
    isLike: false,
    description: "کاغذ دیواری نانو \nبرای اطلاعات بیشتر پیام بدهید.",
    created_at: "7 روز پیش",
    f_name: "فروشگاه",
    l_name: "دیجیکالا",
    open_to_image: "/uploads/avatars/FNQ1R7ZE70.png",
    thumbnail: "",
    comments_count: 2,
    data: [],
  };

  test("renders Card component with given props", () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByTestId("card-header")).toHaveTextContent(
      "فروشگاه دیجیکالا"
    );
    expect(screen.getByTestId("card-header")).toHaveTextContent("7 روز پیش");

    expect(screen.getByText(/کاغذ دیواری نانو/)).toBeInTheDocument();

    expect(screen.queryByTestId("slider")).toBeNull();

    expect(screen.getByTestId("action")).toHaveTextContent("بسندیدن");
    expect(screen.getByTestId("action")).toHaveTextContent("FaRegHeart");

    expect(screen.getByTestId("action")).toHaveTextContent("نظرات");
    expect(screen.getByTestId("action")).toHaveTextContent("FaRegCommentAlt");

    expect(screen.getByTestId("action")).toHaveTextContent("اشتراک گذاری");
    expect(screen.getByTestId("action")).toHaveTextContent("MdOutlineIosShare");

    expect(screen.getByTestId("action")).toHaveTextContent("ذخیره");
    expect(screen.getByTestId("action")).toHaveTextContent("FaRegBookmark");
  });
});
