import Card from "./Card/Card";
import Comment from "./Comment";
import { useAppSelector } from "../../Redux/hooks";
import { RootState } from "../../Redux/store";
//
export default function Content() {
  const { data, loading } = useAppSelector(
    (state: RootState) => state.contentAction
  );
    const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now - date;

    const diffInSeconds =
      diffInMilliseconds / 1000;
    if (diffInSeconds < 60) {
      return `${Math.floor(
        diffInSeconds
      )} ثانیه پیش`;
    }

    const diffInMinutes = diffInSeconds / 60;
    if (diffInMinutes < 60) {
      return `${Math.floor(
        diffInMinutes
      )} دقیقه پیش`;
    }

    const diffInHours = diffInMinutes / 60;
    if (diffInHours < 24) {
      return `${Math.floor(
        diffInHours
      )} ساعت پیش`;
    }

    const diffInDays = diffInHours / 24;
    if (diffInDays < 7) {
      return `${Math.floor(diffInDays)} روز پیش`;
    }

    const diffInWeeks = diffInDays / 7;
    if (diffInWeeks < 4) {
      return `${Math.floor(
        diffInWeeks
      )} هفته پیش`;
    }

    const diffInMonths = diffInDays / 30;
    if (diffInMonths < 12) {
      return `${Math.floor(
        diffInMonths
      )} ماه پیش`;
    }

    const diffInYears = diffInMonths / 12;
    return `${Math.floor(diffInYears)} سال پیش`;
  };
  //
  //
  return (
    <div className="w-full md:w-[59%] lgs:w-[64%] md:px-3 lg:w-[46.6%] xl:w-[53%]">
      {!loading &&
        data.map((card) => (
          <div
            key={card.id}
            className="bg-white mb-5 md:rounded-xl border-2"
          >
            <Card
              id={card.id}
              thumbnail={card.media
                .map(
                  (item: any) => item.thumbnail
                )
                .join(",")}
              description={card.description}
              open_to_image={
                card.user.open_to_image
                  ? card.user.open_to_image
                  : card.user.avatar
              }
              comments_count={card.comments_count}
              f_name={card.user.f_name}
              l_name={card.user.l_name}
              created_at={getRelativeTime(
                card.created_at
              )}
            />
            <Comment
              comment_user_id={card.comments.map(
                (comment: number) =>
                  comment.user.id
              )}
              comment={card.comments.map(
                (item: any) => item.comment
              )}
              likes_countComments={card.comments.map(
                (item: any) => item.likes_count
              )}
              created_at={card.comments
                .map(
                  (item: any) => item.created_at
                )
                .join(", ")}
              f_name={card.user.f_name}
              l_name={card.user.l_name}
              open_to_imageComments={card.comments.map(
                (item: any) =>
                  item.user.open_to_image
              )}
              id_comments={card.comments.map(
                (item: any) => item.user.id
              )}
              id_user={card.user.id}
            />
          </div>
        ))}
    </div>
  );
}
