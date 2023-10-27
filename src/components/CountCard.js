import React from "react";
import { Box, Typography } from "@mui/material";

export default function CountCard({ count, text, icon: Icon, iconColor }) {
  return (
    <Box
      px={2}
      py={2}
      sx={{
        background: "#f9f9f9",
        width: "100%",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <Box
        display={{ xs: "block", lg: "flex" }}
        gap={0.5}
        sx={{ my: 1 }}
        justifyContent={"center"}
      >
        {Icon && (
          <Icon
            color={iconColor}
            sx={{ fontSize: { xs: "40px", md: "18px" } }}
          />
        )}
        <Typography
          variant="caption"
          color={"gray"}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          {text}
        </Typography>
      </Box>
      <Typography variant="h4" fontWeight={"bolder"}>
        {count}
      </Typography>
    </Box>
  );
}
