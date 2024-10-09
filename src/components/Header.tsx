import React,{ useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import Badge from "@mui/material/Badge";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Logout"];

const Header: React.FC=() =>{
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const data = useSelector((state:any) => state.state);
  const cart = useSelector((state:any) => state.cart);

  const dispatch = useDispatch();
  const location = useLocation();

  const decodeJWT = (token:any) => {
    const [header, payload, signature] = token.split(".");

    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));

    return {
      header: decodedHeader,
      payload: decodedPayload,
      signature: signature,
    };
  };

  function fetchDataFromApi() {
    const token = sessionStorage.getItem("jwtToken");
    if(!token){
      navigate('/login')
    }
    const decodedToken = decodeJWT(token);

    const useId = decodedToken.payload.sub;

    fetch(`https://fakestoreapi.com/users/${useId}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch(setUser(json));
      });
  }

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const clearUserDataFromSessionStorage = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if(setting === "Profile"){
      navigate(`/home/${setting}`)
    }
      if(setting=== "Logout"){
        clearUserDataFromSessionStorage()
      };
  };

  console.log("user", data.user);
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(to right, #4ECDC4, #556270)",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* Large screen brand logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/home")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              letterSpacing: ".15rem",
              textDecoration: "none",
              color: "#FFD700",
              cursor:'pointer'
            }}
          >
           Shopping Land
          </Typography>

          {/* Mobile menu icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile brand logo */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              letterSpacing: ".15rem",
              color: "inherit",
              textDecoration: "none",
              cursor:'pointer'
            }}
          >
           Shopping Land
          </Typography>

          {/* Right-side: Cart and User Info */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2, // Adds space between the cart and user info
            }}
          >
            {/* Cart Section */}
            {location.pathname !== "/cartPage" && (
              <Tooltip title="Open Cart">
                <IconButton
                  aria-label="cart"
                  onClick={() => navigate(`/cartPage`)}
                  sx={{
                    background: "#FFC107",
                    color: "#FFFFFF",
                    borderRadius: "50%",
                    "&:hover": {
                      background: "#FFB300",
                    },
                  }}
                >
                  <Badge
                    badgeContent={cart.productsIncart.length}
                    color="secondary"
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            {/* User Name and Avatar Section */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  mr: 1,
                  whiteSpace: "nowrap", // Ensures the name doesn't break onto a new line
                }}
              >
                {data?.user?.name?.firstname} {data?.user?.name?.lastname}
              </Typography>
              <Tooltip title="Open user settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar
                    alt={data?.user?.name?.firstname}
                    src="/static/images/avatar/2.jpg"
                    sx={{ width: 36, height: 36 }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* User Menu */}
          <Menu
            sx={{ mt: "45px"}}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleCloseUserMenu(setting)}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {setting}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
