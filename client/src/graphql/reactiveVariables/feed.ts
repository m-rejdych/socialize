import { makeVar } from '@apollo/client';

interface Profile {
  id: string;
  user: {
    id: string;
    fullName: string;
  };
}

interface ContentData {
  id: string;
  createdAt: Date;
  content: string;
  likes: number;
  dislikes: number;
  author: Profile;
  likedBy?: Profile[] | null;
  dislikedBy?: Profile[] | null;
}

export interface Post extends ContentData {
  comments?: ContentData[] | null;
}

export const feedVar = makeVar<Post[]>([]);
