import {
  Box,
  Dialog,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Paper,
  TableContainer,
  Grid,
  Typography,
  TextField,
  Card,
} from "@mui/material";
import React, { Fragment, useState, useEffect } from "react";
import { getAllCategories, deleteCategory, addCategory } from "./Api";
import DeleteIcon from "@mui/icons-material/Delete";

export const CategoryTable = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories(setCategories);
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} sx={{ }}>
          <Paper className = "cardCenter" sx={{minWidth: "100%", minHeight: "100%"  }}>
            <Typography component="h1" variant="h5" >
              New Category
            </Typography>
            <Box
              component="form"
              className="cardCenter"
              onSubmit={async (event) => {
                await addCategory(event);
                await getAllCategories(setCategories);
              }}
              noValidate
              padding = "1vh 1vw"
            >
              <TextField
                margin="normal"
                size="small"
                required
                fullWidth
                label="Name"
                name="name"
                autoFocus
              />
              <Button
                fullWidth
                sx={{ mt: "1vh" }}
                size="small"
                variant="contained"
                type="submit"
              >
                Add new Category
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} >
          <Paper className="cardCenter" sx={{ minWidth: "100%", minHeight: "100%" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ textAlign: "left" }}>Name</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories?.map((c) => (
                    <Fragment key={c._id}>
                      <TableRow key={c._id}>
                        <TableCell>{c.name}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={async () => {
                              await deleteCategory(c._id);
                              await getAllCategories(setCategories);
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
        </Grid>
      </Grid>
    </Box>
  );
};
