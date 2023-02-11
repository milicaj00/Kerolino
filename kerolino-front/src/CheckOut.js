import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
} from "@mui/material";
import { set } from "mobx";
import React, { useState } from "react";
import { useInstance } from "react-ioc";
import { useNavigate } from "react-router-dom";
import { BagProductList } from "./BagProductList";
import { DeliveryDataForm } from "./DeliveryDataForm";
import { BagStore } from "./store/BagStore";
import { UsersDataStore } from "./store/UserStore";

const PUTANJA = "http://localhost:8000/";

export const CheckOut = () => {
  const [open, setOpen] = useState(false);

  let navigate = useNavigate();

  const userStore = useInstance(UsersDataStore);
  const bagStore = useInstance(BagStore);

  return (
    <Box className="marginS">
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DeliveryDataForm />
      </Dialog>
      <BagProductList></BagProductList>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: "1% 0%" }}>
        <Button variant="contained" color = "secondary" size="large" onClick={() => setOpen(true)}>
          Check Out
        </Button>
      </Box>
    </Box>
  );
};
