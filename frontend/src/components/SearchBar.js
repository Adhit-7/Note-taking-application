import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export default function SearchBar({ value, onChange, placeholder = "Search notes..." }) {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
