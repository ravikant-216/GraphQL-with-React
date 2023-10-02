import { Box, Button, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VerifiedIcon from "@mui/icons-material/Verified";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";

interface TweetCardProps {
  name: string;
  tweet: string;
  time: string;
  date: string;
  userId: string;
  currentUserId: string;
  has_tag: string;
  likes: number;
  views: number;
  onChange?: () => void;
}

export default function TweetCard(props: TweetCardProps) {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        p: 2,
        borderRadius: "5px",
        mb: 2,
        border: "1.5px solid green",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
        >
          <img
            src="https://svgshare.com/i/xmc.svg"
            alt="icon"
            width="40"
            height="40"
          />

          <Typography variant="h6" sx={{ marginLeft: "12px" }}>
            {props.name}
          </Typography>
          {props.userId === props.currentUserId && (
            <VerifiedIcon color="secondary" />
          )}
          {props.userId !== props.currentUserId && (
            <VerifiedIcon color="primary" />
          )}
        </Box>
        {props.userId === props.currentUserId && (
          <Button onClick={props.onChange}>
            <DeleteOutlineIcon />
          </Button>
        )}
      </Box>

      <Typography variant="body1">{props.tweet}</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Typography variant="caption">
          {props.date} at {props.time}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FavoriteBorderIcon color="primary" />
            <Typography variant="body2" color="primary" sx={{ ml: 1 }}>
              {props.likes}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <VisibilityIcon color="primary" />
            <Typography variant="body2" color="secondary" sx={{ ml: 1 }}>
              {props.views}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
