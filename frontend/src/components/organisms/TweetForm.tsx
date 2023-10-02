import React from "react";
import { Box, Button, Typography } from "@mui/material";
import TwitterCard from "../molecules/TwitterCard";
import { useLocation, useNavigate } from "react-router";

export const TweetForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUserId = location.state.currentUserId;
  const currentUserName = location.state.currentUserName;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" sx={{ margin: "12px" }}>
            Welcome {currentUserName}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              localStorage.removeItem("token");
              navigate(`/login`);
            }}
          >
            Logout
          </Button>
        </Box>

        <TwitterCard currentUserId={currentUserId} />
      </Box>
    </>
  );
};
