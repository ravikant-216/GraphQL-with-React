import { User, Tweet } from "./sharedTypes";

interface Context {
  currentUser: User | null;
  tweets: Tweet[];
  users: User[];
}

const Query = {
  allUsers: (_: unknown, args: unknown, context: Context): User[] =>
    context.users,
  userByEmail: (
    _: unknown,
    { email }: { email: string },
    context: Context
  ): User | undefined => {
    return context.users.find((user) => user.email === email);
  },
  userByID: (
    _: unknown,
    { userID }: { userID: string },
    context: Context
  ): User | undefined => {
    return context.users.find((user) => user.userID === userID);
  },
  allTweets: (_: unknown, args: unknown, context: Context): Tweet[] =>
    context.tweets,
  tweetsByUserID: (
    _: unknown,
    { userID }: { userID: string },
    context: Context
  ): Tweet[] => {
    return context.tweets.filter((tweet) => tweet.userID === userID);
  },
  tweetsByHasTag: (
    _: unknown,
    { has_tag }: { has_tag: string },
    context: Context
  ): Tweet[] => {
    return context.tweets.filter((tweet) => tweet.has_tag === has_tag);
  },
};

export default Query;
