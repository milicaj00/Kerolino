import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { signUp } from "./Api";

export const SignUp = () => {
  return (
    <Box
      className="marginS"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={(event) => signUp(event)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              required
              fullWidth
              id="name"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="surname"
              label="Last Name"
              name="surname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
          </Grid>
        </Grid>
        <Button
          // color="secondary"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <NavLink to="/signin" variant="body2">
              Already have an account? Sign in
            </NavLink>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
