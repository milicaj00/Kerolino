import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { addProduct, getAllProducts, modifyProduct } from "./Api";

//KATEGORIJA DA SE DODA

export const ProductForm = ({ product }) => {
  const [picture, setPicture] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    console.log(product);
  }, []);

  return (
    <Box
      className="cardCenter marginS"
      sx={{ gap: "1vh", padding: { sm: "10% 10%" }, alignItems: "stretch" }}
    >
      <Typography className="cardCenter" variant="h4">
        {product === null ? "New Product" : "Modify Product"}
      </Typography>
      <Box
        component="form"
        onSubmit={(event) => {
          product === null
            ? addProduct(event, picture)
            : modifyProduct(event, picture, product._id);
        }}
      >
        <TextField
          margin="dense"
          fullWidth
          name="name"
          label="Name"
          type="text"
          color="primary"
          size="small"
          defaultValue={product === null ? "" : product.name}
        />

        <TextField
          margin="dense"
          fullWidth
          name="price"
          label="Price"
          type="number"
          color="primary"
          size="small"
          defaultValue={product === null ? "" : product.price}
        />

        <TextField
          fullWidth
          margin="dense"
          name="amount"
          label="Amount"
          type="number"
          color="primary"
          size="small"
          defaultValue={product === null ? "" : product.amount}
        />

        <TextField
          margin="dense"
          size="small"
          name="category"
          variant="outlined"
          select
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

        <TextField
          margin="dense"
          fullWidth
          onChange={(event) => {
            setPicture(event.target.files[0]);
          }}
          type="file"
          color="primary"
          size="small"
        />
        <Button
          fullWidth
          sx={{ mt: "1vh" }}
          size="small"
          variant="contained"
          type="submit"
        >
          {product === null ? " Add New Product" : "Modify Product"}
        </Button>
      </Box>
    </Box>
  );
};
