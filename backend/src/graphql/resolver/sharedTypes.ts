export type User = {
  userID: string;
  name: string;
  password: string;
  followers: number;
  following: number;
  email: string;
};

export type Tweet = {
  tweetID: string;
  tweet: string;
  tweetDate: string;
  time: string;
  likes: number;
  views: number;
  userID: string;
  has_tag: string;
};
export type auth = {
  token: string;
  currentUser:User
}
