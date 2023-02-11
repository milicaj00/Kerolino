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
import { deleteOrder, getAllOrders, getMyOrders, sendOrder } from "./Api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const PUTANJA = "http://localhost:8000/";

export const OrdersTable = ({ myOrders }) => {
  const [orders, setOrders] = useState([]);

  const [current, setCurrent] = useState(-1);

  const changeState = (i) => {
    current === i ? setCurrent(-1) : setCurrent(i);
  };
  useEffect(() => {
    if (myOrders) getMyOrders(setOrders);
    else getAllOrders(setOrders);
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
                {o.buyer ? o.buyer.fullName : "Recived: " + o.sent}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ marginRight: "2%" }}
              >
                {o.date_ordered}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {o.buyer !== false && (
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
                )}
                <Grid item xs={12} md={o.buyer ? 6 : 12}>
                  {o?.product?.map((p) => (
                    <Card sx={{ display: "flex", height: "15vh" }}>
                      <CardMedia
                        component="img"
                        image={PUTANJA + p?.image}
                        alt={p?.name}
                        sx={{ width: "25%" }}
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
              sx={{ p: 0 }}
              onClick={async () => {
                if (o.buyer) {
                  await sendOrder(o._id);
                  await getAllOrders(setOrders);
                } else {
                  await deleteOrder(o._id);
                  await getMyOrders(setOrders);
                }
              }}
            >
              {o.buyer ? (
                <CheckCircleIcon sx={{ fontSize: "1.5em", color: "green" }} />
              ) : (
                <DeleteIcon sx={{ fontSize: "1.5em", color: "#a71313" }} />
              )}
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
