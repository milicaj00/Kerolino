import { Box } from "@mui/material";
import React from "react";
import { useInstance } from "react-ioc";
import { CheckOutForm } from "./CheckOutForm";
import { DeliveryDataForm } from "./DeliveryDataForm";
import { UsersDataStore } from "./store/UserStore";

export const CheckOut = () => {
  const userStore = useInstance(UsersDataStore);

  return (
    <Box>
      {!userStore.user && <DeliveryDataForm />}
      {userStore.user && <CheckOutForm />}
    </Box>
  );
};
