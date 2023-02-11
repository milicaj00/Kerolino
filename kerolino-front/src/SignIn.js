import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { signIn } from "./Api";

export const SignIn = () => {
  return (
    <Box className="marginS">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={(event) => signIn(event)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            // color="secondary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <NavLink to="../signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </NavLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
