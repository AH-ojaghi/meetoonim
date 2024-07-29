// Comment.test.tsx
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import Comment from "../src/Components/Content/Comment";

const commentData = {
  comment: "عالی بود",
  likes_countComments: "0",
  created_at: "7 روز پیش",
  f_name: "فروشگاه",
  l_name: "دیجیکالا",
  open_to_imageComments: "/uploads/avatars/FNQ1R7ZE70.png",
  id_comments: "69",
  id_user: "21892",
};

describe("Comment Component", () => {
  it("renders comment with user details", () => {
    render(<Comment {...commentData} />);
    
    expect(screen.getByText("عالی بود")).toBeInTheDocument();
    
    expect(screen.getByText("فروشگاه")).toBeInTheDocument();
    expect(screen.getByText("دیجیکالا")).toBeInTheDocument();
    
    expect(screen.getByText("7 روز پیش")).toBeInTheDocument();
    
    expect(screen.getByText("0")).toBeInTheDocument();
    
    const profileImage = screen.getByRole("img");
    expect(profileImage).toHaveAttribute("src", "https://meetoonim.com/uploads/avatars/FNQ1R7ZE70.png");
  });

  it("toggles favorite state on like button click", () => {
    render(<Comment {...commentData} />);
    
    const likeButton = screen.getByRole("button", { name: /like/i });
    fireEvent.click(likeButton);
    
    expect(screen.getByRole("button", { name: /unlike/i })).toBeInTheDocument();
    
    fireEvent.click(likeButton);
    
    expect(screen.getByRole("button", { name: /like/i })).toBeInTheDocument();
  });

  it("shows dropdown menu on click", () => {
    render(<Comment {...commentData} id_comments="69" id_user="69" />);
    
    const dropdownButton = screen.getByRole("button", { name: /more options/i });
    fireEvent.click(dropdownButton);
    
    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems.length).toBe(2);
    expect(menuItems[0]).toHaveTextContent("حذف");
    expect(menuItems[1]).toHaveTextContent("ویرایش");
  });
});
