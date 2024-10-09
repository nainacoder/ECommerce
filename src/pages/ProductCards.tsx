import React from 'react'
// import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Stack,
  CardActionArea,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, setQuantities } from "../redux/userCartSlice";
import { AddShoppingCart } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const ProductCard = ({ products }) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state:any) => state.cart);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(setQuantities({ type: "increment", id: product.id }));
    dispatch(addToCart(product));
  };

  const handleIncreaseQuantity = (id:string) => {
    dispatch(setQuantities({ type: "increment", id }));
  };

  const handleDecreaseQuantity = (id:string) => {
    dispatch(setQuantities({ type: "decrement", id }));
  };

  const style={display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to bottom, #f0f4f8, #e0e7ee)",
    minHeight: "100vh",
    overflow: "hidden",
  }
  const cardStyle= {
    height: '100%', // Ensure cards are the same height
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 3,
    borderRadius: 2,
    transition: "transform 0.3s",
    "&:hover": { transform: "scale(1.05)" },
  }

  return (
    <Stack  sx={style}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 3, // Adjusted gap between cards
          padding: 2,
          width: '100%',
        }}
      >
        {products?.map((product) => (
          <Card
            key={product.img}
            sx={cardStyle}
          >
            <CardActionArea
              onClick={() => navigate(`/productDetail/${product.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={product?.image}
                alt={product?.title}
                sx={{ objectFit: "cover", borderRadius: "8px 8px 0 0" }}
              />
              <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                  {product?.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {product?.description}
                </Typography>
                <Typography
            variant="h5"
            sx={{mt:4}}
          >
                  ${product?.price}
                </Typography>
              </CardContent>
            </CardActionArea>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "8px",
              }}
            >
              {!cartData?.quantities[product?.id] ? (
                <IconButton
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  <AddShoppingCart />
                </IconButton>
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    onClick={() => handleDecreaseQuantity(product?.id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <span style={{ margin: "0 8px" }}>
                    {cartData?.quantities[product?.id]}
                  </span>
                  <IconButton
                    onClick={() => handleIncreaseQuantity(product?.id)}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              )}
            </Box>
          </Card>
        ))}
      </Box>
    </Stack>
  );
};

// ProductCard.propTypes = {
//   products: PropTypes.array.isRequired,
// };

export default ProductCard;
