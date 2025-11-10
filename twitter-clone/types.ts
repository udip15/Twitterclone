export interface User {
  id: string;
  name: string;
  handle: string; // This will serve as the username
  avatarUrl: string;
  emailOrPhone?: string;
  password?: string; // This is for simulation purposes only. Never store plaintext passwords in a real app.
  bio?: string;
  bannerUrl?: string;
  followingCount?: number;
  followerCount?: number;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
}

export interface Tweet {
  id: string;
  user: User;
  content: string;
  imageUrl?: string;
  timestamp: string;
  stats: {
    comments: number;
    retweets: number;
    likes: number;
  };
  comments: Comment[];
}