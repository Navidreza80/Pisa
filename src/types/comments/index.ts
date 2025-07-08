/* eslint-disable */

export interface Comments {
  id: string;
  house_id: string;
  user_id: string | null;
  title: string;
  caption: string;
  rating: number;
  created_at: Date;
  parent_comment_id: string | null;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    profilePicture: null;
  };
  parent_comment: any;
}

export interface PostCommentParams {
  title: string;
  caption: string;
  rating: number;
  parent_comment_id: number | null;
  houseId: string;
}

export interface CommentResponse {
  id: number;
  text: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
  };
}