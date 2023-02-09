import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  CardContent,
  CardActions,
} from "@mui/material";
import "./index.css";
import React, { useEffect, useState } from "react";
import { getMyOrders } from "./Api";

const Profile = ({ user }) => {
  const [myOdrers, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders(setOrders, user._id);
  }, []);

  return (
    <Box className="marginS">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card
            variant="outlined"
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <CardContent sx={{ flexGrow: "1", marginBottom: "5%" }}>
              <Typography
                variant="h5"
                sx={{ height: "35%", textTransform: "capitalize" }}
              >
                {" "}
                {user?.fullName}
              </Typography>
              <Typography>Email: {user?.email}</Typography>
              <Typography>Phone number: {user?.phoneNum}</Typography>
              <Typography>Address: {user?.address} </Typography>
            </CardContent>
            <CardActions
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <Button mb={2} variant="contained">
                Change Delivery Data
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          {myOdrers?.map((o) => (
            <Card key={o._id}></Card>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
