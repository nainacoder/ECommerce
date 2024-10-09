import { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setQuantities } from "../redux/userCartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleIncreaseQuantity = (id) => {
    dispatch(setQuantities({ type: "increment", id }));
  };

  const handleDecreaseQuantity = (product) => {
    if (cartData.quantities[product.id] === 1) {
      setSelectedId(product);
      setModalOpen(true);
    } else {
      dispatch(setQuantities({ type: "decrement", id: product.id }));
    }
  };

  const confirmRemove = () => {
    dispatch(setQuantities({ type: "decrement", id: selectedId.id }));
    setModalOpen(false);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    navigate("/success");
  };

  const totalProducts = Object.values(cartData.quantities).reduce(
    (total, item) => total + item,
    0
  );

  const totalPrice = cartData.productsIncart.reduce((total, item) => {
    return total + item.price * cartData.quantities[item.id];
  }, 0);


  console.log(totalProducts, 'totalProducts')
console.log(cartData,'cartData')

  return (
    <div
      style={{
        display: "flex",
        padding: "20px",
        background: "rgba(255, 224, 204, 0.5)",
        backgroundSize: "cover",
        height: "100vh",
        backgroundBlendMode: "multiply",
      }}
    >
      <div
        style={{
          flex: 3,
          overflowY: "auto",
          maxHeight: "80vh",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Cart: {cartData.productsIncart.length} items
        </h2>

        {cartData.productsIncart.map((product) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "white",
            }}
          >
            {/* Product Image and Title */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={product.image}
                alt={product.title}
                style={{
                  width: "100px",
                  marginRight: "10px",
                  borderRadius: "4px",
                }}
              />
              <div>
                <h3 style={{ margin: 0, fontSize: "1.2rem" }}>
                  {product.title}
                </h3>
              </div>
            </div>

            {/* Price and Cart Controls */}
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>
                Price: $
                {(cartData.quantities[product.id] * product.price).toFixed(2)}
              </p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="outlined"
                  onClick={() => handleDecreaseQuantity(product)}
                >
                  -
                </Button>
                <span style={{ margin: "0 10px" }}>
                  {cartData.quantities[product.id]}
                </span>
                <Button
                  variant="outlined"
                  onClick={() => handleIncreaseQuantity(product.id)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div
        style={{
          flex: 1,
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          marginLeft: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ textAlign: "center" }}>Summary</h3>
        <p>Total products: {totalProducts}</p>
        <p style={{ fontWeight: "bold" }}>
          Total price: ${totalPrice.toFixed(2)}
        </p>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClearCart}
          fullWidth
           disabled={cartData.productsIncart.length === 0}
        >
          Proceed to Buy
        </Button>
      </div>

      {/* Confirm Modal for Removing Product */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <h3>Remove {selectedId?.title}?</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={confirmRemove}
            >
              Yes, Remove
            </Button>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CartPage;
