import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const CardStatiticsAdmin = ({ title, description, value, sx }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#0A0F29",
        color: "white",
        padding: 2,
        borderRadius: 2,
        transition: "box-shadow 0.3s ease-in-out", 
        "&:hover": {
          boxShadow: "0 10px 20px rgba(0, 150, 255, 0.3)", 
        },
        ...sx, 
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="gray">
          {description}
        </Typography>
        <Typography variant="body2" color="gray">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardStatiticsAdmin;