import React from "react";
import Fab from "@mui/material/Fab";
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";

const ListButton = () => {
  return (
    <Fab
      style={{
        position: "absolute",
        bottom: "300px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: "#121212",
        opacity: 0.8,
      }}
      aria-label="一覧表示"
      component={Link} to="/list"
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <ListIcon style={{ color: "white" }}/>
      <span style={{ color: "white", fontSize: "10px", marginTop: "1px" }}>一覧</span>
      </div>
    </Fab>
  );
};

export default ListButton;
