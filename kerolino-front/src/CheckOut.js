import { Card, CardMedia, CardContent, Box, Typography, Button } from "@mui/material";
import React from "react";
import { useInstance } from "react-ioc";
import { BagStore } from "./store/BagStore";

const PUTANJA = "http://localhost:8000/";

export const CheckOut = () => {
  const bagStore = useInstance(BagStore);

  return (
    <Box className="marginS">
      <Box>
        {bagStore.product.map((p, i) => (
          <Card variant="outlined" sx={{ display: "flex", margin: "2%" }}>
            <CardMedia
              component="img"
              sx={{ width: "25%" }}
              image={PUTANJA + p.image}
              alt={p.name}
            />

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent>
                <Typography>Name: {p.name}</Typography>
                {/* <Typography>Amount: {o?.product?.amount}</Typography> */}
                <Typography>Price: {p?.price}</Typography>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Box>
      <Button>
        Check out
      </Button>
    </Box>
  );
};
