export interface Post {
  id: string;
  displayName: string;
  username: string;
  content: string;
  likes: number;
  replies: Reply[];
}

export interface Tweet {
  id: string;
  text: string;
  public_metrics: {
    like_count: number;
  };
}

export interface Reply {
  id: string;
  displayName: string;
  username: string;
  content: string;
  likes: number;
}
