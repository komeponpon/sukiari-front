import React from "react";
import Fab from "@mui/material/Fab";
import { Link, useNavigate } from "react-router-dom";
import { FilterAltOff } from "@mui/icons-material";

const FilterOffButton = () => {
  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate("/"); 
  };

  return (
    <Fab
      style={{
        position: "absolute",
        top: "104px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: "#121212",
        opacity: 0.8,
      }}
      aria-label="フィルター"
      onClick={handleHomePage} 
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <FilterAltOff style={{ color: "white" }}/>
      <span style={{ color: "white", fontSize: "8px", marginTop: "1px" }}>解除</span>
      </div>
    </Fab>
  );
};

export default FilterOffButton;
