import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import React from "react";
import { useInstance } from "react-ioc";
import { BagStore } from "./store/BagStore";


const PUTANJA = "http://localhost:8000/";

export const BagProductList = () => {
  const bagStore = useInstance(BagStore);
  return (
    <>
      {bagStore.product.map((p, i) => (
        <Card
          variant="outlined"
          key={i}
          sx={{ margin: "1%", width: "100%" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4} sm={3}>
              <CardMedia
                className="cardImg"
                component="img"
                image={PUTANJA + p.pr.image}
                alt={p.name}
              />
            </Grid>
            <Grid item xs={8} sm={9} className="cardCenter">
              <CardContent>
                <Typography>Name: {p.pr.name}</Typography>
                <Typography>Amount: {p?.amount}</Typography>
                <Typography>Price: {p.pr?.price}</Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      ))}
    </>
  );
};
