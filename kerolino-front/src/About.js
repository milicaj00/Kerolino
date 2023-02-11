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
                    flexWrap: { sm: "wrap", md: "nowrap", sx: "wrap" }
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
                        Teretana RDLGym počela je sa radom u februaru 2015.
                        godine, kada smo pod istim krovom okupili najbolje
                        stručnjake u regionu kako bismo svim našim klijentima
                        pružili nezaboravno iskustvo treninga na jednom mestu. U
                        ovaj posao ušli smo punim srcem i sa jasnom idejom: da
                        budemo apsolutni lideri u oblasti fizičke aktivnosti u
                        Srbiji ali i u zemljama u regionu.
                    </Typography>

                    <Typography variant="text.secondary">
                        Ne pravimo nikakav kompromis kada je u pitanju oprema
                        koju koristimo u poslu i uvek odlučno biramo da budemo
                        najbolji i pružimo najbolje.
                    </Typography>

                    <Typography variant="text.secondary">
                        Zato ćete kod nas vežbati na najsavremenijim spravama iz
                        TechnoGym porodice, a svi naši partneri sa kojima ćete
                        se susreti u teretani RDLGym će doprineti vašem
                        maksimalnom užitku jer radimo isključivo sa najboljima,
                        a to su: Jana, Proteini.si, Red Bull, Nike i Nivea.
                    </Typography>

                    <Typography variant="text.secondary">
                        Naša misija je da pružimo najbolju uslugu i ostvarimo
                        neprikosnovene rezultate sa svim klijentima koji nam
                        ukazuju svoje dragoceno poverenje i da uvek pružimo i
                        više od maksimuma: a to znači da ne budemo samo treneri,
                        već i savetnici i posvećeni motivatori.
                    </Typography>

                    <Typography mb={4} variant="text.secondary">
                        Od kako postojimo naša vizija je ista – da budemo
                        sinonim za teretanu koja je ubedljivo najbolja po svim
                        svetskim standardima i koji konstantno diktira nove
                        trendove u sferi zdravog načina života i fizičke
                        aktivnosti.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default About;
