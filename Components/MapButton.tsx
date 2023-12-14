import React from "react";
import Fab from "@mui/material/Fab";
import MapIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

const MapButton = () => {
  return (
    <Fab
      style={{
        position: "absolute",
        bottom: "128px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: "#121212",
        opacity: 0.8,
      }}
      aria-label="地図表示"
      component={Link} to="/"
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <MapIcon style={{ color: "white" }}/>
      <span style={{ color: "white", fontSize: "10px", marginTop: "1px" }}>地図</span>
      </div>
    </Fab>
  );
};

export default MapButton;
