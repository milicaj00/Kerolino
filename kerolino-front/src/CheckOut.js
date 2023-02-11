import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
} from "@mui/material";
import { set } from "mobx";
import React, { useState } from "react";
import { useInstance } from "react-ioc";
import { useNavigate } from "react-router-dom";
import { DeliveryDataForm } from "./DeliveryDataForm";
import { BagStore } from "./store/BagStore";
import { UsersDataStore } from "./store/UserStore";

const PUTANJA = "http://localhost:8000/";

export const CheckOut = () => {
  const [open, setOpen] = useState(false);

  let navigate = useNavigate();

  const userStore = useInstance(UsersDataStore);
  const bagStore = useInstance(BagStore);

  return (
    <Box className="marginS">
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DeliveryDataForm/>
      </Dialog>
      <Box className="cardCenter">
        {bagStore.product.map((p, i) => (
          <Card variant="outlined" key={i} sx={{ margin: "1% 0%" }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <CardMedia
                  component="img"
                  image={PUTANJA + p.pr.image}
                  alt={p.name}
                />
              </Grid>
              <Grid item xs={9} className="cardCenter">
                <CardContent>
                  <Typography>Name: {p.pr.name}</Typography>
                  <Typography>Amount: {p?.amount}</Typography>
                  <Typography>Price: {p.pr?.price}</Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: "1% 0%" }}>
        <Button variant="contained" size="large" onClick={() => setOpen(true)}>
          Check Out
        </Button>
      </Box>
    </Box>
  );
};
