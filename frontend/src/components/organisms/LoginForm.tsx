import React, { useEffect, useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { gql, useMutation } from "@apollo/client";

const LOGIN_USER = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      currentUser {
        name
        userID
      }
    }
  }
`;

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [login] = useMutation(LOGIN_USER);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await login({ variables: { email: username, password } });
      if (result.data.login.token) {
        localStorage.setItem("token", result.data.login.token);
        navigate(`/tweet`, {
          state: {
            currentUserId: result.data.login.currentUser.userID,
            currentUserName: result.data.login.currentUser.name,
          },
        });
      }
    } catch (error) {
      setError("Wrong credentials");
    }
  };

  useEffect(() => {
    setError("");
  }, [password.length, username.length]);

  const isButtonDisabled = !username || !password;

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0px 0px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          border: error ? "2px solid red" : "2px solid green",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Email Id"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            error={!!error}
            helperText={error ? "Email ID does not exist" : ""}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            error={!!error}
            helperText={error ? "Password you entered is wrong" : ""}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ background: "green" }}
            disabled={isButtonDisabled}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
