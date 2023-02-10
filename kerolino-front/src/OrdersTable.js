import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Typography,
  CardMedia,
  CardContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllOrders, sendOrder } from "./Api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const PUTANJA = "http://localhost:8000/";

export const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  const [current, setCurrent] = useState(-1);

  const changeState = (i) => {
    current === i ? setCurrent(-1) : setCurrent(i);
  };
  useEffect(() => {
    getAllOrders(setOrders);
  }, []);

  return (
    <Box className="marginS">
      {orders?.map((o, i) => (
        <Box key={i} display="flex" flexDirection="row">
          <Accordion
            sx={{ flexGrow: 1, marginBottom: "1%" }}
            expanded={current === i}
            onClick={() => {
              changeState(i);
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                variant="h6"
                sx={{ flexGrow: 1, textTransform: "capitalize" }}
              >
                {o.buyer.fullName}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ marginRight: "2%" }}
              >
                {o?.date}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography fontWeight="500">{o.buyer?.email}</Typography>
                  <Typography fontWeight="500">
                    {o.buyer?.phoneNumber}
                  </Typography>
                  <Typography
                    fontWeight="500"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {o.buyer?.address}
                  </Typography>
                </Grid>

                {/* <Grid item xs={12} md={6}>
                  {o?.product?.map((p) => (
                    <Card sx={{ display: "flex" }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={PUTANJA + p?.image}
                        alt={p?.name}
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography> {p?.name}</Typography>
                          <Typography>Amount {p?.amount}</Typography>
                          <Typography>Price: {p?.price}</Typography>
                        </CardContent>
                      </Box>
                    </Card>
                  ))}
                </Grid> */}

                <Grid item xs={12} md={6}>
                  <Card variant = "outlined" sx={{ display: "flex", m: "2%" }}>
                    <CardMedia
                      component="img"
                      sx={{ width: "30%" }}
                      image={PUTANJA + o?.product?.image}
                      alt={o?.product?.name}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography>Name: {o?.product?.name}</Typography>
                        <Typography>Amount: {o?.product?.amount}</Typography>
                        <Typography>Price: {o?.product?.price}</Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              margin: "1% 0% 1% 1%",
            }}
          >
            <IconButton
              disableRipple={true}
              sx={{ p: 0, color: "green" }}
              onClick={async () => {
                await sendOrder(o._id);
                await getAllOrders(setOrders);
              }}
            >
              <CheckCircleIcon sx={{ fontSize: "1.5em" }} />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
