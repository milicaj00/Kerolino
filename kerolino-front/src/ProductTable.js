import {
  Box,
  Button,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
} from "@mui/material";
import React, { Fragment, useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductForm } from "./ProductForm";
import { deleteProduct, getAllProducts } from "./Api";

export const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [change, setChangeProducts] = useState(false);
  const [newproduct, setNewProduct] = useState(false);

  const handleChange = (value) => {
    setChangeProducts(value);
  };
  const handleNewProduct = (value) => {
    setNewProduct(value);
  };

  useEffect(() => {
    getAllProducts(setProducts);
  }, []);

  return (
    <Box>
      <Dialog
        open={change}
        onClose={async () => {
          await handleChange(false);
          await setProduct(null);
          await getAllProducts(setProducts);
        }}
      >
        <ProductForm product={product} />
      </Dialog>
      <Dialog
        open={newproduct}
        onClose={async () => {
          await handleNewProduct(false);
          await getAllProducts(setProducts);
        }}
      >
        <ProductForm product={product} />
      </Dialog>
      <Button
        size="medium"
        variant="outlined"
        onClick={() => handleNewProduct(true)}
      >
        new product
      </Button>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: "left" }}> Name </TableCell>
                <TableCell sx={{ textAlign: "left" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "left" }}>Amount</TableCell>
                <TableCell sx={{ textAlign: "left" }}>Category</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((p, i) => (
                <Fragment key={p._id}>
                  <TableRow key={p._id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.price}</TableCell>
                    <TableCell>{p.amount}</TableCell>
                    <TableCell>{p.price}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setProduct(p);
                          handleChange(true);
                        }}
                      >
                        Modify
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={async () => {
                          await deleteProduct(p._id);
                          await getAllProducts(setProducts);
                        }}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
