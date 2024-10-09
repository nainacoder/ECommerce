import React,{ ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography} from "@mui/material";

const Login = () => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({email:"",password:""});
  const [validate, setValidate] = useState(true);
  const [error1, setError1] = useState(null)
  const navigate = useNavigate();
  
  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFields({
      ...inputFields,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    let isValidate = true;
    let validationError = {email:'', password:''};
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

    function checkUserDetails() {
      fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputFields.email,
          password: inputFields.password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          sessionStorage.setItem("jwtToken", json.token);
          navigate("/home");
        })
        .catch((error) => {
          isValidate = false;
          validationError.password = "Wrong password";
          setError(validationError);
          setValidate(isValidate);
          setError1(error)
        });
    }

    checkUserDetails();
  };
  // const loginImage = '../assets/images/login.jpg';
  const isDisabled = inputFields.email && inputFields.password;

const ParentStyle={
  display: "flex",
  justifyContent: "flex-end", // Align the form to the right
  alignItems: "center",
  minHeight: "100vh",
  // background: `url(${loginImage}) no-repeat center center/cover`,
  paddingRight: "50px",
  paddingLeft: "50px",
}

const FormStyle={
  display: "flex",
  flexDirection: "column",
  width: "40%",
  padding: "30px",
  backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparent white for form
  borderRadius: "15px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Subtle shadow
}
  return (
    <Box
      sx={ParentStyle}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={FormStyle}
      >
        <Typography variant="h4" gutterBottom color="primary">
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
          sx={{
            mt: 3,
            mb: 2,
            width: "100%",
            padding: "10px 0",
          }}
          disabled={!isDisabled}
        >
        Login
        </Button>
        {error1 && <h6>{error1}</h6>}
      </Box>
    </Box>
  );
};

export default Login;
