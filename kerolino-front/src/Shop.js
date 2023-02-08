import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllProducts } from "./Api";

const PUTANJA = "http://localhost:8000/";

export const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts(setProducts);
  }, []);

  return (
    <Box sx={{ margin: "2%" }}>
      <Box sx={{ marginBottom: "2%" }}>
        <TextField
          variant="outlined"
          focused
          placeholder="Search"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Grid container spacing={2}>
        {products?.map((p, i) => {
          {
            console.log(p);
          }
          <Grid item key={i} xs={12} sm={6} md={4} xl={3} className="cardCenter" >
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={PUTANJA + p.image}
                  alt={p.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {p.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {p.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>;
        })}
      </Grid>
    </Box>
  );
};
