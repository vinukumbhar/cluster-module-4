import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";

const LoginButton = () => {
  const navigate = useNavigate();
  const handleLoginPage = () => {
    navigate("/login");
  };
  return (
    <Box display="flex" alignItems="center" mt={4} flexDirection={"column"}>
      <Box>
        SHRI HANUMAN SAHAKARI DUDH VYAVSAYIK , KRUSHIPURAK SEVA SANSTHA
        MARYADIT ,  YALDUD
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 5 }}
        onClick={handleLoginPage}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginButton;
