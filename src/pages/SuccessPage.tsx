import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SuccessPage :React.FC= () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        padding: "20px",
        background:
          "url('path/to/your/success-background.jpg') no-repeat center center fixed",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#28a745" }}>
        Successfully Purchased!
      </h1>
      <p style={{ fontSize: "1.5rem", color: "#555" }}>
        Thank you for your purchase.
      </p>

      {/* Back to Home Button */}
      <Button
        variant="text"
        color="primary"
        onClick={() => navigate("/home")}
        style={{ fontSize: "1.2rem", padding: "10px 20px" }}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default SuccessPage;
