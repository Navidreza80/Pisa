export interface Comments {
  id: string;
  house_id: string;
  user_id: string | null;
  title: string;
  caption: string;
  rating: number;
  created_at: Date;
  parent_comment_id: string | null;
  user: null;
  parent_comment: Comment | null;
}
