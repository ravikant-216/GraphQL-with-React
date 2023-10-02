import React, { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  CircularProgress,
  Container,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import TweetCard from "../atoms/TweetCard";

interface TwitterCardProps {
  currentUserId: string;
}

const ADD_TWEET = gql`
  mutation AddTweet(
    $tweet: String!
    $tweetDate: String!
    $time: String!
    $likes: Int!
    $views: Int!
    $userID: ID!
    $has_tag: String
  ) {
    addTweet(
      tweet: $tweet
      tweetDate: $tweetDate
      time: $time
      likes: $likes
      views: $views
      userID: $userID
      has_tag: $has_tag
    ) {
      tweetID
      tweet
      tweetDate
      time
      likes
      views
      userID
      has_tag
    }
  }
`;

const GET_TWEETS = gql`
  query {
    allTweets {
      tweetID
      tweet
      tweetDate
      time
      likes
      views
      userID
      has_tag
    }
  }
`;

const GET_USERS = gql`
  query {
    allUsers {
      userID
      name
    }
  }
`;

const DELETE_TWEET = gql`
  mutation ($tweetID: ID!) {
    deleteTweet(tweetID: $tweetID)
  }
`;

export default function TwitterCard(props: TwitterCardProps) {
  const [tweet, setTweet] = useState("");

  const [addTweet, { loading }] = useMutation(ADD_TWEET, {
    onCompleted: () => {
      setTweet("");
      refetchTweets();
    },
  });

  const handleAddTweet = () => {
    addTweet({
      variables: {
        tweet,
        tweetDate: new Date().toISOString().split("T")[0],
        time: new Date().toISOString().split("T")[1].split(".")[0],
        likes: Math.floor(Math.random() * 100),
        views: Math.floor(Math.random() * 500),
        userID: `${props.currentUserId}`,
        has_tag: "#random",
      },
    });
  };

  const {
    loading: tweetsLoading,
    error: tweetsError,
    data: tweetsData,
    refetch: refetchTweets,
  } = useQuery(GET_TWEETS);
  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(GET_USERS);

  const [deleteTweet] = useMutation(DELETE_TWEET, {
    onCompleted: () => refetchTweets(),
  });

  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    if (tweetsData && usersData) {
      const updatedTweets = tweetsData.allTweets.map((tweet: any) => {
        const user = usersData.allUsers.find(
          (user: any) => user.userID === tweet.userID
        );
        return { ...tweet, userName: user ? user.name : "Unknown" };
      });
      setTweets(updatedTweets);
    }
  }, [tweetsData, usersData]);

  if (tweetsLoading || usersLoading) return <CircularProgress />;
  if (tweetsError || usersError)
    return (
      <Typography variant="h6" color="error">
        Error: Oops Something went wrong
      </Typography>
    );

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <TextField
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          label="New Tweet"
          variant="outlined"
          sx={{ width: "100%" }}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTweet}
            sx={{ marginLeft: "30px" }}
          >
            Add Tweet
          </Button>
        )}
      </Box>
      <Box sx={{ my: 4 }}>
        {tweets.map((tweet: any) => (
          <TweetCard
            key={tweet.tweetID}
            name={tweet.userName}
            tweet={tweet.tweet}
            time={tweet.time}
            date={tweet.tweetDate}
            userId={tweet.userID}
            currentUserId={props.currentUserId}
            has_tag={tweet.has_tag}
            likes={tweet.likes}
            views={tweet.views}
            onChange={() =>
              deleteTweet({ variables: { tweetID: tweet.tweetID } })
            }
          />
        ))}
      </Box>
    </Container>
  );
}
