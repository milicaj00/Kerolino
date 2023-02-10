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
import { getAllProducts, getAllCategories, findProducts } from "./Api";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import { BagStore } from "./store/BagStore";

const PUTANJA = "http://localhost:8000/";

export const Shop = observer(() => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  let navigate = useNavigate();
  const bagStore = useInstance(BagStore)

  useEffect(() => {
    getAllProducts(setProducts);
    getAllCategories(setCategories);
  }, []);

  return (
    <Box sx={{ margin: "2%" }}>
      <Grid container spacing={2} sx={{ marginBottom: "2%" }}>
        <Grid
          item
          xs={12}
          sm={8}
          component="form"
          onSubmit={async (event) => await findProducts(event, setProducts)}
        >
          <TextField
            size="small"
            variant="outlined"
            name="filter"
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
            fullWidth
            defaultValue={-1}
          >
            <MenuItem key={-1} value={-1}>
              Choose Category
            </MenuItem>
            {categories.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
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
            <Card sx={{ minWidth: "100%"}}>
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
              <CardActions className="cardCenter">
                <Button
                  size="small"
                  color="primary"
                  onClick={() => bagStore.addProduct(p)}
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
});
