import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const CardTeacher = ({ name, description }) => {
  return (
    <Card sx={{ backgroundColor: "#0A0F29", color: "white", padding: 2, borderRadius: 2, width: 280 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          <strong>{name}</strong>
        </Typography>
        <Typography variant="body2" color="gray" sx={{ marginBottom: 1 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardTeacher;
