import { generateToken } from "../../service/jwt.service";
import { users as Users } from "../../../database/data";
import { Tweet, User, auth } from "./sharedTypes";
import { GraphQLError } from "graphql";
interface Context {
  currentUser: User | null;
  tweets: Tweet[];
  users: User[];
}
const Mutation = {
  addUser: (
    _: any,
    {
      name,
      email,
      password,
      followers,
      following,
    }: {
      name: string;
      email: string;
      password: string;
      followers: number;
      following: number;
    },
    context: Context
  ): User => {
    const newUser: User = {
      userID: String(context.users.length + 1),
      name,
      email,
      password,
      followers,
      following,
    };

    context.users.push(newUser);

    return newUser;
  },
  deleteUser: (
    _: any,
    { userID }: { userID: string },
    context: Context
  ): boolean => {
    const userIndex = context.users.findIndex(
      (user: any) => user.userID === userID
    );

    if (userIndex !== -1) {
      context.users.splice(userIndex, 1);
      return true;
    }

    return false;
  },
  addTweet: (
    _: any,
    {
      tweet,
      tweetDate,
      time,
      likes,
      views,
      userID,
      has_tag,
    }: {
      tweet: string;
      tweetDate: string;
      time: string;
      likes: number;
      views: number;
      userID: string;
      has_tag: string;
    },
    context: Context
  ): Tweet => {
    const newTweet: Tweet = {
      tweetID: String(context.tweets.length + 1),
      tweet,
      tweetDate,
      time,
      likes,
      views,
      userID,
      has_tag,
    };

    context.tweets.push(newTweet);

    return newTweet;
  },
  deleteTweet: (
    _: any,
    { tweetID }: { tweetID: string },
    context: Context
  ): boolean => {
    const tweetIndex = context.tweets.findIndex(
      (tweet: any) => tweet.tweetID === tweetID
    );

    if (tweetIndex !== -1) {
      context.tweets.splice(tweetIndex, 1);
      return true;
    }

    return false;
  },
  login: (_: any, { email, password }: { email: string; password: string }) => {
    const user = Users.find(
      (user: User) => user.password === password && user.email === email
    );
    if (user) {
      const data: auth = {
        token: generateToken({ id: user.userID }),
        currentUser: user,
      };
      console.log(data.currentUser.name);
      return data;
    } else {
      throw new GraphQLError("not valid");
    }
  },
};

export default Mutation;
