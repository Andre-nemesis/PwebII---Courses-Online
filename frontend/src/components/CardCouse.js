import React from "react";
import { Card, CardContent, Typography, Box, Link } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CardModule = ({ title, description }) => {
  return (
    <Card sx={{ backgroundColor: "#0A0F29", color: "white", padding: 2, borderRadius: 2, width: 280 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          <strong>{title}</strong>
        </Typography>
        <Typography variant="body2" color="gray" sx={{ marginBottom: 1 }}>
          {description}
        </Typography>
        <Box display="flex" alignItems="center">
          <Link href="#" underline="none" sx={{ color: "#00AEEF", fontWeight: "bold" }}>
            Continuar
          </Link>
          <ArrowForwardIosIcon sx={{ color: "#00AEEF", fontSize: 16, marginLeft: 0.5 }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardModule;
