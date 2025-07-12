import {
  Box,
  Checkbox,
  InputLabel,
  TextField,
  Typography,
  FormControlLabel,
  Button,
  Paper,
} from "@mui/material";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePinChange = (value) => setPin(value);
  const handleRememberMeChange = (e) => setRememberMe(e.target.checked);

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("PIN:", pin);
    console.log("Remember Me:", rememberMe);
    navigate("/home");
    
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f9f9f9",
      }}
    >
      <Paper elevation={3} sx={{ p: 5, width: 400, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Login Page
        </Typography>
        <Box mt={2}>
          <InputLabel shrink>Username / Email Address</InputLabel>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Enter email"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
          />
        </Box>
        <Box mt={2}>
          <InputLabel shrink>PIN</InputLabel>
          <OtpInput
            value={pin}
            onChange={handlePinChange}
            numInputs={4}
            inputType="tel"
            separator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            containerStyle={{ display: "flex" }}
            inputStyle={{
              width: "2rem",
              height: "2rem",
              margin: "0 0.5rem",
              marginTop: "10px",
              fontSize: "1.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              textAlign: "center",
            }}
          />
        </Box>

        <Box mt={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={handleRememberMeChange}
                color="primary"
              />
            }
            label="Remember me"
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
