import React, { Fragment } from "react";
import { Typography, ImageList, ImageListItem, Divider } from "@mui/material";
import { Box } from "@mui/system";

const itemData = [
    {
        img: "http://onewellnessnis.rs/wp-content/uploads/2017/03/One-wellness-TERETANA-1-1024x682.jpg",
        title: "Breakfast",
        rows: 2,
        cols: 2
    },
    {
        img: "http://onewellnessnis.rs/wp-content/uploads/2017/04/DSC_6581-1024x682.jpg",
        title: "Burger"
    }
];

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`
    };
}

const About = () => {
    /**justify-content: center;
    align-items: center; */
    return (
        <Box>
            <Box
                sx={{
                    height: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Typography variant="h2" color={"#878787"}>
                    About
                </Typography>
            </Box>
            <Divider />

            <Box sx={{ my: "10vh" }}>
                <Box
                    component="img"
                    src="http://localhost:8000/about-horisontal-image.jpg"
                    alt="main image"
                    width={"100vw"}
                    height="70vh"
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexWrap: { xs: "wrap", sm: "wrap", md: "nowrap" }
                }}
            >
                <Box
                    component="img"
                    src="http://localhost:8000/about-second-image.webp"
                    alt="secondary image"
                    width={{ sm: "100vw", md: "40vw" }}
                    height="65vh"
                    sx={{ m: "5%" }}
                />
                <Box
                    sx={{
                        width: { sm: "100vw", md: "40vw" },
                        p: "5%"
                    }}
                >
                    <Typography variant="text.secondary">
                        ESed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit, sed quia consequuntur magni dolores eos
                        qui ratione voluptatem sequi nesciunt. Neque porro
                        quisquam est, qui dolorem ipsum quia dolor sit amet,
                        consectetur, adipisci velit, sed quia non numquam eius
                        modi tempora incidunt ut labore et dolore magnam aliquam
                        quaerat voluptatem. Ut enim ad minima veniam, quis
                        nostrum exercitationem ullam corporis suscipit
                        laboriosam, nisi ut aliquid ex ea commodi consequatur?
                        Quis autem vel eum iure reprehenderit qui in ea
                        voluptate velit esse quam nihil molestiae consequatur,
                        vel illum qui dolorem eum fugiat quo voluptas nulla
                        pariatur?
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default About;
