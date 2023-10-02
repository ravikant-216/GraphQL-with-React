import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    userID: ID!
    name: String!
    password: String!
    followers: Int!
    following: Int!
    email: String!
  }

  type Tweet {
    tweetID: ID!
    tweet: String!
    tweetDate: String!
    time: String!
    likes: Int!
    views: Int!
    userID: ID!
    has_tag: String
  }

  type Query {
    allUsers: [User]!
    userByEmail(email: String!): User
    userByID(userID: ID!): User
    allTweets: [Tweet]!
    tweetsByUserID(userID: ID!): [Tweet]!
    tweetsByHasTag(has_tag: String!): [Tweet]!
  }
  type TokenResponse {
    token: String
    currentUser: User
  }

  type Mutation {
    deleteUser(userID: ID!): Boolean
    login(email: String!, password: String!): TokenResponse
    addUser(
      name: String!
      password: String!
      followers: Int!
      following: Int!
      email: String!
    ): User!

    deleteTweet(tweetID: ID!): Boolean
    addTweet(
      tweet: String!
      tweetDate: String!
      time: String!
      likes: Int!
      views: Int!
      userID: ID!
      has_tag: String
    ): Tweet!
  }
`;
