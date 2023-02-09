import { Box, Typography, TextField, Button } from "@mui/material";
import React from "react";

//SUBMIT 

export const DeliveryDataForm = () => {
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
          Delivery Data
        </Typography>
        <Box
          component="form"
          // onSubmit={(event) => signIn(event)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name="address" required fullWidth label="Address" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth label="City" name="city" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Post Number"
                name="postNumber"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phoneNum"
                required
                fullWidth
                label="Phone Number"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Data
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
