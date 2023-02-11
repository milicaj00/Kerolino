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
  Container,
  Menu,
  Grid,
  Badge,
  Card,
  CardMedia,
  CardContent,
  Divider,
  BackdropRoot,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { UsersDataStore } from "./store/UserStore";
import { observer } from "mobx-react-lite";
import { useInstance } from "react-ioc";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { BagStore } from "./store/BagStore";
import { BagProductList } from "./BagProductList";

const PUTANJA = "http://localhost:8000/";

export const Navbar = observer(() => {
  let navigate = useNavigate();

  const userStore = useInstance(UsersDataStore);
  const bagStore = useInstance(BagStore);

  const navItems =
    userStore.user !== null
      ? [
          { val: "Shop", link: "/" },
          { val: "About", link: "/about" },
          { val: "Contact", link: "/" },
          { val: "Profile", link: "/profile" },
        ]
      : [
          { val: "Shop", link: "/" },
          { val: "About", link: "/about" },
          { val: "Contact", link: "" },
          { val: "Sign In", link: "/signin" },
        ];

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.val} disablePadding>
            <ListItemButton
              href={item.val === "Contact" && "#kontakt"}
              sx={{ textAlign: "center" }}
              onClick={() => {
                if (item.link !== "") navigate(item.link);
              }}
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
              textAlign: "left",
            }}
          >
            KEROLINO
          </Typography>
          {(!userStore.user?.is_seller || !userStore.user) && (
            <IconButton
              onClick={handleClick}
              sx={{ color: "#fff" }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Badge
                badgeContent={bagStore.product.length}
                color="secondary"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          )}

          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                href={item.val === "Contact" && "#kontakt"}
                key={item.val}
                sx={{ color: "#fff" }}
                onClick={() => {
                  if (item.link !== "") navigate(item.link);
                }}
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
      <Menu
        anchorEl={anchorEl}
        className="shopping-bag"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <Box sx={{ overflowY: "auto", overflowX: "hidden", maxHeight: "40vh" }}>
          <BagProductList bag={true} />
          {bagStore.product.length !== 0 && (
            <Box sx={{ m: "1%" }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  handleClose();
                  navigate("/checkout");
                }}
              >
                Check out
              </Button>
            </Box>
          )}
          {bagStore.product.length === 0 && (
            <Box
              className="cardCenter"
              sx={{ width: { xs: "80vw", sm: "30vw" }, height: "20vh" }}
            >
              <Typography fontWeight={500}>Your Bag Is Empty!</Typography>
            </Box>
          )}
        </Box>
      </Menu>

      <Box>
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </AppBar>
  );
});
