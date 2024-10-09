import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const data = useSelector((state) => state.state);
  const navigate = useNavigate();

  const { name, email, username, phone, address } = data.user;
const cardStyle={
  maxWidth: 400,
  margin: "20px auto",
  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
  overflow: "hidden",
  background: "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)",
}
  return (
    <Card
      sx={cardStyle}
    >
      <CardContent
        sx={{
          padding: "30px",
          background: "white",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
        }}
      >
        {/* Full Name */}
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            color: "#3f51b5",
            fontWeight: 700,
            textTransform: "capitalize",
          }}
        >
          {name.firstname} {name.lastname}
        </Typography>

        {/* Email */}
        <Typography
          variant="body2"
          sx={{
            color: "#555",
            marginBottom: "8px",
          }}
        >
          <strong>Email:</strong> {email}
        </Typography>

        {/* Username */}
        <Typography
          variant="body2"
          sx={{
            color: "#555",
            marginBottom: "8px",
          }}
        >
          <strong>Username:</strong> {username}
        </Typography>

        {/* Phone */}
        <Typography
          variant="body2"
          sx={{
            color: "#555",
            marginBottom: "8px",
          }}
        >
          <strong>Phone:</strong> {phone}
        </Typography>

        {/* Address */}
        <Typography
          variant="body2"
          sx={{
            color: "#555",
            marginBottom: "8px",
          }}
        >
          <strong>Address:</strong> {address.number} {address.street},{" "}
          {address.city}, {address.zipcode}
        </Typography>

        {/* Geolocation */}
        <Typography
          variant="body2"
          sx={{
            color: "#555",
          }}
        >
          <strong>Geolocation:</strong> Lat: {address.geolocation.lat}, Long:{" "}
          {address.geolocation.long}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          background: "#3f51b5",
        }}
      >
        <Button
          size="large"
          variant="contained"
          sx={{
            background: "#ff8c00",
            borderRadius: "30px",
            textTransform: "none",
            padding: "10px 20px",
            fontSize: "16px",
            ":hover": {
              background: "#ff7f00",
            },
          }}
          onClick={() => navigate("/home")}
        >
          Back to Home
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserDetails;
