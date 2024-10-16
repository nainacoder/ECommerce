import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/images/login.jpg";
import { Box, Button, TextField, Typography } from "@mui/material";

const Login = () => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({ email: "", password: "" });
  const [validate, setValidate] = useState(true);
  const [error1, setError1] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFields({
      ...inputFields,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    let isValidate = true;
    let validationError = { email: "", password: "" };
    if (inputFields.email === "" || inputFields.email === null) {
      isValidate = false;
      validationError.email = "email required";
    } else if (/\s+@\s+\.\s+/.test(inputFields.email)) {
      isValidate = false;
      validationError.email = "email is not valid";
    }

    if (inputFields.password === "" || inputFields.password === null) {
      isValidate = false;
      validationError.password = "password required";
    } else if (inputFields.password.length < 6) {
      isValidate = false;
      validationError.password = "password lenght should be atleast 6 char";
    }

    async function checkUserDetails() {
      try {
        const response = await fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: inputFields.email,
            password: inputFields.password,
          }),
        });
        const data = await response.json();
        sessionStorage.setItem("jwtToken", data.token);
        navigate("/home");
      } catch (error) {
        isValidate = false;
        validationError.password = "Wrong password";
        setError(validationError);
        setValidate(isValidate);
        setError1(error);
      }
    }

    checkUserDetails();
  };

  const isDisabled = inputFields.email && inputFields.password;

  const ParentStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
    position: "fixed",
    width: "100vw",
    background: `url(${loginImage}) no-repeat center center/cover`,
  };

  const FormStyle = {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    padding: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparent white for form
    borderRadius: "15px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Subtle shadow
  };

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      navigate("/home");
      return;
    }
  }, []);

  return (
    <Box sx={ParentStyle}>
      <Box sx={FormStyle}>
        <Typography
          variant="h4"
          gutterBottom
          color="primary"
          sx={{ alignSelf: "center" }}>
          Login
        </Typography>
        {!validate && (
          <Typography color="error" variant="body2">
            {error.email}, {error.password}
          </Typography>
        )}
        <TextField
          name="email"
          label="Email Address"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          value={inputFields.email}
          onChange={handleInputChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          value={inputFields.password}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            mt: 3,
            mb: 2,
            width: "100%",
            padding: "10px 0",
          }}
          disabled={!isDisabled}>
          Login
        </Button>
        {error1 && <h6>{error1}</h6>}
      </Box>
    </Box>
  );
};

export default Login;
