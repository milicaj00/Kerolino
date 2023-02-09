import React, { useState } from "react";
import { Box, Tabs, Grid, Tab, Typography } from "@mui/material";
import { ProductTable } from "./ProductTable";
import { OrdersTable } from "./OrdersTable";
import { CategoryTable } from "./CategoryTable";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};

export const ProfileAdmin = () => {
  const savedTab = parseInt(sessionStorage.getItem("tab"));
  const [tab, seTab] = useState(savedTab ? savedTab : 0);

  const handleChange = (event, newValue) => {
    seTab(newValue);
    sessionStorage.setItem("tab", newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{ display: { xs: "flex", md: "none" }, justifyContent: "center" }}
        >
          <Tabs
            position="sticky"
            orientation="horizontal"
            variant="scrollable"
            scrollButtons
            value={tab}
            onChange={handleChange}
          >
            <Tab label="Products" value={0} />
            <Tab label="Categories" />
            <Tab label="Orders" />
          </Tabs>
        </Grid>
        <Grid item xs={12} md={2} sx={{ display: { xs: "none", md: "flex" } }}>
          <Tabs
            position="sticky"
            orientation="vertical"
            variant="scrollable"
            value={tab}
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: "divider", width: "100%" }}
          >
            <Tab label="Products" />
            <Tab label="Categories" />
            <Tab label="Orders" />
          </Tabs>
        </Grid>
        <Grid item xs={12} md={10}>
          <TabPanel value={tab} index={0}>
            <ProductTable />
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <CategoryTable />
          </TabPanel>

          <TabPanel value={tab} index={2}>
            <OrdersTable />
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};
