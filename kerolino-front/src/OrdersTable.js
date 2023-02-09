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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllOrders } from "./Api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
      {orders.map((o, i) => (
        <Box key={i} display="flex" flexDirection="row">
          <Accordion
            sx={{ flexGrow: 1, marginBottom: "1%" }}
            expanded={current === i}
            onClick={() => {
              changeState(i);
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ flexGrow: 1, textTransform: "capitalize" }}>{o.buyer.name} {o.buyer.surname}</Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ marginRight: "2%"}}
              >
                {o?.date}

              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  md={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  {/* <Typography>Broj telefona: {z.brojtelefonaT}</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Intenzitet: {z.intenzitet}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>Tip: {z.tip}</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Online: {z.isOnline.toString()}
                  </Typography> */}
                </Grid>

                {/* <Grid item xs={12} md={10}>
                  <Box textAlign="center">
                    <Typography mb={1} textAlign="center" fontWeight="500">
                      {" "}
                    </Typography>
                    <Grid container spacing={2} justifyContent="center" mb={1}>
                      {evidencija?.intenziteti?.map((e, i) => (
                        <Grid item xs={12} md={2} key={i}>
                          <Card
                            className="cardShadow"
                            sx={{ padding: "1vh", textAlign: "justify" }}
                          >
                            <Typography>
                              Datum: {evidencija.datumi[i]}
                            </Typography>
                            <Typography>
                              Tip: {evidencija.tipTreninga[i]}
                            </Typography>
                            <Typography>Intenzitet: {e}</Typography>
                          </Card>
                        </Grid> 
                      ))}
                      </Grid>         
                      </Box>
                </Grid>*/}
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
              // onClick={() => potvrdiZahtev(z.idZahteva)}
            >
              <CheckCircleIcon sx={{ fontSize: "1.5em" }} />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
