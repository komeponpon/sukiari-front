import React from "react";
import Fab from "@mui/material/Fab";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const CurrentLocationButton = ({ onClick }) => {
  return (
    <Fab
      style={{
        position: "absolute",
        bottom: "236px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: "#121212",
        opacity: 0.8,
      }}
      aria-label="現在地を表示"
      onClick={onClick}
    >
      <MyLocationIcon style={{ color: "white" }} />
    </Fab>
  );
};

export default CurrentLocationButton;
