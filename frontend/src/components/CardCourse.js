import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const CardCourse = ({ id, title, description, type,role }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === "admin") {
      if(role === "admin") navigate(`/admin/courses/${id}/modules`);
      else navigate(`/manager/courses/${id}/modules`);
    }
    else if (type === "teacher") {
      navigate(`/teacher/courses/${id}/modules`);
    }
    else {
      navigate(`/student/courses/${id}/modules`);
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: "#0A0F29",
        color: "white",
        padding: 2,
        borderRadius: 2,
        width: 280,
      }}
    >
      <CardContent onClick={handleClick}>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="gray" width="380px">
          {description}
        </Typography>
        <Box display="flex" alignItems="center">
          <Button
            sx={{
              color: "#00AEEF",
              mt: "15px",
              textDecoration: "none",
            }}
          >
            Ver mais
          </Button>
          <ArrowForwardIosIcon
            sx={{ color: "#00AEEF", fontSize: 16, marginLeft: 0.5, marginTop: "14px" }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardCourse;