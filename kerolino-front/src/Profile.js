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

import { UsersDataStore } from "./store/UserStore";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import { OrdersTable } from "./OrdersTable";

const Profile = observer(() => {
  const [myOdrers, setOrders] = useState([]);
  const userStore = useInstance(UsersDataStore);

  useEffect(() => {
    if (userStore.user) getMyOrders(setOrders, userStore.user._id);
  }, [userStore.user]);

  return (
    <Box className="marginS">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <CardContent sx={{ flexGrow: "1", marginBottom: "5%" }}>
              <Typography
                variant="h5"
                sx={{
                  height: "35%",
                  textTransform: "capitalize",
                }}
              >
                {userStore.user?.fullName}
              </Typography>
              <Typography>Email: {userStore.user?.email}</Typography>
              <Typography>Phone number: {userStore.user?.phoneNum}</Typography>
              <Typography>Address: {userStore.user?.address} </Typography>
              <Typography>City: {userStore.user?.city} </Typography>
              <Typography>Post Number: {userStore.user?.postNumber}</Typography>
            </CardContent>
            <CardActions className="cardCenter">
              <Button
                variant="contained"
                
                onClick={async () => await userStore.deleteUser()}
              >
                Delete Profile
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box className="cardCenter">
            <Typography variant="h5">My orders</Typography>
          </Box>
          <OrdersTable myOrders={true} />
        </Grid>
      </Grid>
    </Box>
  );
});

export default Profile;
