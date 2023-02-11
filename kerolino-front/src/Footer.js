import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { NavLink } from "react-router-dom";
import {
    Typography,
    Link,
    Box,
    Grid,
    Container,
    TextField,
    Button
} from "@mui/material";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" textAlign="center">
            {"© "}
            <Link color="inherit" href="/pocetna">
                Kerolino
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export const Footer = theme => {
    return (
        <Box
            component="footer"
            id="kontakt"
            sx={{
                // position: "fixed",
                width: "100%",
                bottom: 0,
                mt: "auto",
                backgroundColor: theme =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800]
            }}
        >
            <Box
                sx={{ backgroundColor: "#ebebed", color: "#878787" }}
                width="100vw"
            >
                <Box
                    sx={{
                        // my: "75%",
                        // height: "60vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }}
                >
                    <Typography variant="h5" sx={{ mt: "10%" }}>
                        Prijavite se putem emaila i prvi saznajte sve Kerolino
                        novosti
                    </Typography>

                    <div className="dunja-kont">
                        <input className="dunja-in" />
                        <button className="dunja-btn">send</button>
                    </div>

                    <Box sx={{ display: "flex", textDecoration: "uppercase" }}>
                        <Link sx={{ color: "#878787", m: "5%" }} href="/">
                            SHOP
                        </Link>

                        <Link sx={{ color: "#878787", m: "5%" }} href="/about">
                            ABOUT
                        </Link>
                    </Box>
                </Box>

                <Grid
                    container
                    justifyContent={"center"}
                    className="grid-contact"
                >
                    <Grid
                        sm={2}
                        item
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <LocationOnOutlinedIcon />
                        <Link
                            sx={{ marginLeft: "2%" }}
                            href="https://goo.gl/maps/Akp9XkeKBDunKv41A"
                            target="_blank"
                            rel="noopener"
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Aleksandra Medvedeva 14
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid
                        item
                        sm={2}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center "
                        }}
                    >
                        <EmailOutlinedIcon />
                        <Typography
                            sx={{ marginLeft: "2%" }}
                            variant="caption"
                            color="text.secondary"
                        >
                            contact@rekolino.com
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        sm={2}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center "
                        }}
                    >
                        <PhoneOutlinedIcon />
                        <Typography
                            sx={{ marginLeft: "2%" }}
                            variant="caption"
                            color="text.secondary"
                        >
                            +381 66 2568459
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Copyright />
            </Box>
        </Box>
    );
};
