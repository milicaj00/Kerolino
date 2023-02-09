import React from "react";
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Container
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { UsersDataStore } from "./store/UserStore";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";

export const Navbar = observer(() => {
    let navigate = useNavigate();

    const userStore = useInstance(UsersDataStore);

    const navItems =
        userStore.user !== null
            ? [
                  { val: "Shop", link: "/" },
                  { val: "About", link: "/about" },
                  { val: "Contact", link: "/contact" },
                  { val: "Profile", link: "/profile" }
              ]
            : [
                  { val: "Shop", link: "/" },
                  { val: "About", link: "/about" },
                  { val: "Contact", link: "/contact" },
                  { val: "Sign In", link: "/signin" }
              ];

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(prevState => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <List>
                {navItems.map(item => (
                    <ListItem key={item.val} disablePadding>
                        <ListItemButton
                            sx={{ textAlign: "center" }}
                            onClick={() => navigate(item.link)}
                        >
                            <ListItemText primary={item.val} />
                        </ListItemButton>
                    </ListItem>
                ))}
                {userStore.user && (
                    <ListItem key="Log out" disablePadding>
                        <ListItemButton
                            sx={{ textAlign: "center" }}
                            onClick={() => {
                                localStorage.clear();
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1000);
                            }}
                        >
                            <ListItemText primary="Log out" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Box>
    );

    const container = window.document.body;

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        component="div"
                        onClick={() => navigate("/")}
                        sx={{
                            flexGrow: 1,
                            display: { xs: "block" },
                            textAlign: "left"
                        }}
                    >
                        KEROLINO
                    </Typography>
                    <IconButton
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ ml: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon sx={{ color: "white" }} />
                    </IconButton>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {navItems.map(item => (
                            <Button
                                key={item.val}
                                sx={{ color: "#fff" }}
                                onClick={() => navigate(item.link)}
                            >
                                {item.val}
                            </Button>
                        ))}
                        {userStore.user && (
                            <Button
                                key="Log out"
                                sx={{ color: "#fff" }}
                                onClick={() => {
                                    localStorage.clear();
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 1000);
                                    navigate("../");
                                }}
                            >
                                Log out
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
            <Box>
                <Drawer
                    anchor="right"
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: 240
                        }
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </AppBar>
    );
});
