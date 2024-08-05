import Media from "./media";
import User from "./user";
//
interface PostInterface {
  id: number;
  title: string;
  description: string;
  likes_count: number;
  comments_count: number;
  views_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
  user: User[];
  media: Media[];
  likes: object;
  comments: object;
  created_at: string;
  updated_at: string;
}
//
class Post {
  id: number;
  title: string;
  description: string;
  likes_count: number;
  comments_count: number;
  views_count: number;
  is_liked: boolean;
  is_bookmarked: boolean;
  user: User[];
  media: Media[];
  likes: object;
  comments: object;
  created_at: string;
  updated_at: string;
//
  constructor(data: PostInterface) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.likes_count = data.likes_count;
    this.comments_count = data.comments_count;
    this.views_count = data.views_count;
    this.is_liked = data.is_liked;
    this.is_bookmarked = data.is_bookmarked;
    this.user = data.user;
    this.media = data.media;
    this.likes = data.likes;
    this.comments = data.comments;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}

export default Post;