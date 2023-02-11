import {
  IconButton,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
} from "@mui/material";
import React from "react";
import { useInstance } from "react-ioc";
import { BagStore } from "./store/BagStore";
import DeleteIcon from "@mui/icons-material/Delete";

const PUTANJA = "http://localhost:8000/";

export const BagProductList = ({ bag }) => {
  const bagStore = useInstance(BagStore);
  return (
    <>
      {bagStore.product.map((p, i) => (
        <Card variant="outlined" key={i} sx={{ margin: "1%", width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={4} sm={3}>
              <CardMedia
                className="cardImg"
                component="img"
                image={PUTANJA + p.pr.image}
                alt={p.name}
              />
            </Grid>
            <Grid
              item
              xs={8}
              sm={9}
              sx={{
                padding: "0% 10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CardContent sx={{ textAlign: "left" }}>
                <Typography>Name: {p.pr.name}</Typography>
                <Typography>Amount: {p?.amount}</Typography>
                <Typography>Price: {p.pr?.price}</Typography>
              </CardContent>
              <CardActions>
                {bag && (
                  <IconButton
                    sx={{ p: 0 }}
                    onClick={() => bagStore.removeProduct(p.pr)}
                  >
                    <DeleteIcon sx={{ fontSize: "1.5em", color: "#a71313" }} />
                  </IconButton>
                )}
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      ))}
    </>
  );
};
