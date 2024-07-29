import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Content from "../src/Components/Content/Content";

jest.mock("../src/Components/Card/Card", () => (props: any) => (
  <div data-testid="card">
    {props.id} {props.thumbnail} {props.description} {props.open_to_image}{" "}
    {props.comments_count} {props.f_name} {props.created_at}
  </div>
));

jest.mock("../src/Components/Comment", () => (props: any) => (
  <div data-testid="comment">
    {props.comment} {props.likes_countComments} {props.created_at}{" "}
    {props.f_name} {props.l_name} {props.open_to_imageComments}{" "}
    {props.id_comments} {props.id_user}
  </div>
));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        data: [
          {
            id: 96,
            title: null,
            description: "کاغذ دیواری نانو \nبرای اطلاعات بیشتر پیام بدهید.",
            likes_count: 14,
            comments_count: 2,
            views_count: 2738,
            is_liked: false,
            is_bookmarked: false,
            user: {
              id: 21892,
              followers_count: null,
              followings_count: null,
              is_followed_by_current_user: false,
              is_blocked_by_current_user: false,
              is_friend: true,
              username: null,
              email: null,
              f_name: "فروشگاه",
              l_name: "دیجیکالا",
              avatar:
                "/uploads/avatars/7LTMJEUfeDKgGVBd21h4OXwNsjjxXICintvCyUlI.jpg",
              open_to_status: "freelance",
              open_to_image: "/uploads/avatars/FNQ1R7ZE70.png",
              province: null,
              city: null,
              mobile_number: "09308064121",
              description: "hello",
              job_title: null,
              is_company: true,
              company_id: 3084,
              birth_date: "1401/08/30",
              banner:
                "/uploads/banners/WPWVIraqcsq0V95HOhtZIhJlJjOKAw86CYn0TQNM.jpg",
              video: null,
              wallet_amount: 0,
              company: {
                id: 3084,
                name: "دیجیکالا",
                en_name: "digikala",
                title: "فروشگاه آنلاین",
                company_category_id: null,
                banner:
                  "/uploads/banners/wAIZlYrf9kwQZO8vxRJ97HYUJxrgzUyD3RldLjhW.jpg",
                image:
                  "/uploads/images/ovwMgx8Faylog4vzFL7lnsP7SPgXIpFJ1E1fUymu.png",
                city_id: null,
                province_id: null,
                city_name: "تهران",
                province_name: null,
                description:
                  "هر آنچه که نیاز دارید با بهترین قیمت از دیجی‌کالا بخرید! جدیدترین انواع گوشی موبایل، لپ تاپ، لباس، لوازم آرایشی و بهداشتی، کتاب، لوازم خانگی، خودرو و...",
                website: null,
                founded_at: "2023-05-24 00:00:00",
                company_size: null,
                email: null,
                email_verified_at: null,
              },
              golden_end_date: "2025-07-11 14:36:38",
              account_settlement_in_progress: true,
              shaba_number: null,
              is_shaba_number_verified: false,
            },
            media: [],
            likes: [],
            comments: [
              {
                id: 69,
                comment: "عالی بود",
                user: {
                  id: 21892,
                  f_name: "فروشگاه",
                  l_name: "دیجیکالا",
                  avatar:
                    "/uploads/avatars/7LTMJEUfeDKgGVBd21h4OXwNsjjxXICintvCyUlI.jpg",
                  open_to_status: "freelance",
                  open_to_image: "/uploads/avatars/FNQ1R7ZE70.png",
                  username: null,
                },
                created_at: "7 روز پیش",
                is_liked: false,
                likes_count: 0,
              },
            ],
          },
        ],
      }),
  })
) as jest.Mock;

describe("Content Component", () => {
  test("renders Content component and fetches data", async () => {
    render(<Content />);

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("comment")).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledWith(
      "https://meetoonim.com/api/v1/posts/?page=1",
      expect.objectContaining({
        method: "GET",
      })
    );
  });
});
