import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { addToCart, setQuantities } from "../redux/userCartSlice";


const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { id: i } = useParams();

  //   const data = useSelector((state) => state.cart);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //  const cartData = useSelector((state) => state.cart);
  //   const navigate = useNavigate();

  //   const cartItem = products.products?.findIndex((item) => item.id === id);

  useEffect(() => {
    const cartItem = state.state.products.find((obj) => obj.id === Number(i));
    setProduct(cartItem);
  }, []);

  const handleAddToCart = (product) => {
    dispatch(setQuantities({ type: "increment", id: product.id }));
    dispatch(addToCart(product));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(setQuantities({ type: "increment", id }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(setQuantities({ type: "decrement", id }));
  };

  return (
    <div
      style={{
        margin: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: '65vw',
          margin: "20px",
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
          borderRadius: "15px",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        {/* Product Image */}
        <CardMedia
          component="img"
          height="200"
          image={product?.image}
          alt={product?.title}
          sx={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
        />

        {/* Product Content */}
        <CardContent sx={{ padding: "16px" }}>
          {/* Title */}
          <Typography gutterBottom variant="h5" component="div" >
            {product?.title}
          </Typography>
            {/* description */}
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {product?.description}
          </Typography>

          {/* Price */}
          <Typography
            variant="h5"
            sx={{mt:4}}
          >
            ${product?.price}
          </Typography>
        </CardContent>

        {/* Cart Controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "16px",
          }}
        >
          {/* If item is not in the cart, show "Add to Cart" */}
          {!state.cart.quantities[product?.id] ? (
            <IconButton
              color="primary"
              onClick={() => handleAddToCart(product)}
              sx={{
                backgroundColor: "#ff9800",
                color: "white",
                "&:hover": {
                  backgroundColor: "#ffb74d",
                },
              }}
            >
              <AddShoppingCart />
            </IconButton>
          ) : (
            // Show quantity control if already in cart
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => handleDecreaseQuantity(product?.id)}
                sx={{
                  backgroundColor: "#f44336",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ef5350",
                  },
                }}
              >
                <RemoveIcon />
              </IconButton>

              {/* Quantity */}
              <Typography variant="body2" sx={{ margin: "0 8px" }}>
                {state.cart?.quantities[product?.id]}
              </Typography>

              <IconButton
                onClick={() => handleIncreaseQuantity(product?.id)}
                sx={{
                    backgroundColor: "#4caf50",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#66bb6a",
                  },
                }}
              >
                <AddIcon />
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/cartPage")}
                sx={{
                  position: "relative",
                   left: "10px",
                   right: '16px',
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Go to Cart
              </Button>
            </Box>
          )}
        </Box>
      </Card>
    </div>
  );
};

// ProductDetail.propTypes = {
//   products: PropTypes.array.isRequired, // or PropTypes.func (if it's not required)
// };

export default ProductDetail;
