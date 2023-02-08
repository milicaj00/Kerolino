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
  CardActions,
  Button,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllProducts } from "./Api";
import { useNavigate } from "react-router-dom";

const PUTANJA = "http://localhost:8000/";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    getAllProducts(setProducts);
    setCategories([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  }, []);

  return (
    <Box sx={{ margin: "2%" }}>
      <Grid container spacing={2} sx={{ marginBottom: "2%" }}>
        <Grid item xs={12} sm={8}>
          <TextField
            size="small"
            variant="outlined"
            // focused
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
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            size="small"
            variant="outlined"
            select
            // label="Category"
            // focused
            // helperText="Category"
            fullWidth
            defaultValue={-1}
          >
            <MenuItem key={-1} value={-1}>
              Choose Category
            </MenuItem>
            {categories.map((c, i) => (
              <MenuItem key={i} value={i}>
                {c}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {products?.map((p, i) => (
          <Grid
            item
            key={i}
            xs={12}
            sm={6}
            md={4}
            xl={3}
            className="cardCenter"
          >
            <Card sx={{ minWidth: "100%", minHeight: "100%" }}>
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
                    Cena: {p.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="cardCenter">
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate("/" + p._id)}
                >
                  Add to bag
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
