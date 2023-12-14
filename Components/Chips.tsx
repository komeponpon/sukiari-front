import React from "react";
import { Card, Typography } from "@mui/material";

const StatusChips = () => {
  const statusList = [
    { name: "スキアリ", image: "images/status1.png" },
    { name: "ややスキ", image: "images/status2.png" },
    { name: "ギリスキ", image: "images/status3.png" },
    { name: "スキナシ", image: "images/status4.png" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        position: "absolute",
        top: "16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Card
        style={{
          height: "84px",
          width: "370px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
        variant="outlined"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
           variant="caption" style={{ fontWeight: "bold", fontSize: "8px"}}
          >
            空席あり
          </Typography>
          <img
            src="images/arrow.svg" 
            alt="Arrow"
            style={{
              margin: "0 8px", 
              height: "6px", 
            }}
          />
          <Typography
            variant="caption" style={{ fontWeight:"bold", fontSize: "8px"}}
          >
            ほぼ満席
          </Typography>
        </div>
        
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center"
          }}
        >
          {statusList.map((status, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 8px",
              }}
            >
              <img
                src={status.image}
                alt={status.name}
                style={{
                  marginBottom: "4px",
                  height: "24px"
                }}
              />
              <Typography variant="caption" style={{ fontWeight: "bold" }}>{status.name}</Typography>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StatusChips;
