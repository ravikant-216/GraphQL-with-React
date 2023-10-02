import { ApolloServer } from "apollo-server";
import { users, tweets } from "../database/data";
import { typeDefs } from "./graphql/schema";
import Query from "./graphql/resolver/query";
import Mutation from "./graphql/resolver/mutation";
import jwt from "jsonwebtoken";
import { JwtPayload, decodeJwtToken } from "../src/service/jwt.service";

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  context: async ({ req }) => {
    const authorizationToken = req.headers?.authorization;
    let currentUser = null;

    if (authorizationToken) {
      const token = authorizationToken.split(" ")[1];
      const payload = (await decodeJwtToken(token)) as JwtPayload;
      currentUser = users.find((user) => user.userID == payload.id);
      console.log("This iis user" + currentUser?.name);
      return { currentUser, tweets, users };
    }
    return { tweets, users };
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at: ${url}`);
});
