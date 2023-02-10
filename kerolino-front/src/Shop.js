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
import { getAllCategories, findProducts } from "./Api";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import { BagStore } from "./store/BagStore";

const PUTANJA = "http://localhost:8000/";

export const Shop = observer(() => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filterCategory, setCategory] = useState("");
  const [filterName, setName] = useState("");

  const handleChangeCategory = (c) => {
    setCategory(c);
  };

  const handleChangeName = (n) => {
    setName(n);
  };

  let navigate = useNavigate();
  const bagStore = useInstance(BagStore);

  useEffect(() => {
    findProducts(setProducts);
    getAllCategories(setCategories);
  }, []);

  return (
    <Box sx={{ margin: "2%" }}>
      <Grid container spacing={2} sx={{ marginBottom: "2%" }}>
        <Grid
          item
          xs={12}
          sm={8}
          onChange={async (event) => {
            handleChangeName(event.name);
            await findProducts(setProducts, event.name, filterCategory);
          }}
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
            onChange={async (event) => {
              handleChangeCategory(event.value);
              await findProducts(setProducts, filterName, event.value);
            }}
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
            <Card sx={{ minWidth: "100%" }}>
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
                  Amount: {p.amount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cena: {p.price}
                </Typography>
              </CardContent>
              <CardActions className="cardCenter">
                <Button
                  size="small"
                  color="primary"
                  disabled = {p.amount === 0}
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
