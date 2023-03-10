import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInstance } from "react-ioc";
import { useNavigate } from "react-router-dom";
import { addOrder, addUser } from "./Api";
import { BagStore } from "./store/BagStore";
import { UsersDataStore } from "./store/UserStore";

//SUBMIT

export const DeliveryDataForm = () => {
    const userStore = useInstance(UsersDataStore);
    const bagStore = useInstance(BagStore);
    let navigate = useNavigate();

    return (
        <Box className="marginS">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Typography component="h1" variant="h5">
                    Delivery Data
                </Typography>
                <Box
                    component="form"
                    onSubmit={async event => {
                        event.preventDefault();
                        if (!userStore.user) {
                            await userStore.addUser(event.currentTarget);
                            const buyerId = userStore.user._id;
                            await addOrder(buyerId, bagStore.product);
                        } else {
                            const buyerId = userStore.user._id;
                            await userStore.editUser(event.currentTarget);
                            await addOrder(buyerId, bagStore.product);
                        }

                        bagStore.emptyBag();
                        navigate("/");
                    }}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <Grid container spacing={2}>
                        {userStore.user === null && (
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                        )}
                        {userStore.user === null && (
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="surname"
                                    label="Last Name"
                                    name="surname"
                                />
                            </Grid>
                        )}
                        {userStore.user === null && (
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phonNum"
                                label="Phone Number"
                                name="phoneNum"
                                defaultValue={userStore.user?.phoneNum}
                                // focused={userStore.user?.phoneNum !== null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="address"
                                required
                                fullWidth
                                label="Address"
                                defaultValue={userStore.user?.address}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="City"
                                name="city"
                                defaultValue={userStore.user?.city}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Post Number"
                                name="postNumber"
                                defaultValue={userStore.user?.postNumber}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Order
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
