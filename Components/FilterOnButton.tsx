import React from "react";
import Fab from "@mui/material/Fab";
import { Link, useNavigate } from "react-router-dom";
import { FilterAlt } from "@mui/icons-material";

const FilterOnButton = () => {
  const navigate = useNavigate();

  const handleReloadFilteredPage = () => {
    navigate("/filtered", { replace: true }); 
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
      onClick={handleReloadFilteredPage} //再読み込み処理を実行
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <FilterAlt style={{ color: "white" }}/>
      <span style={{ color: "white", fontSize: "8px", marginTop: "1px" }}>スキアリ</span>
      </div>
    </Fab>
  );
};

export default FilterOnButton;
