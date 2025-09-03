import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  Button,
  Stack,
  Tooltip,
  Avatar,
} from "@mui/material";
import NoteAltRoundedIcon from "@mui/icons-material/NoteAltRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const NavButton = ({ to, icon, label }) => {
    const active = location.pathname === to;
    return (
      <Button
        component={Link}
        to={to}
        startIcon={icon}
        variant={active ? "contained" : "text"}
        color={active ? "primary" : "inherit"}
      >
        {label}
      </Button>
    );
  };

  return (
    <Box>
      <AppBar position="sticky" elevation={0} color="transparent">
        <Toolbar sx={{ backdropFilter: "blur(10px)" }}>
          <Typography variant="h6" sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 1 }}>
            <NoteAltRoundedIcon />
            Notes
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <NavButton to="/notes" icon={<NoteAltRoundedIcon />} label="Notes" />
            <NavButton to="/categories" icon={<CategoryRoundedIcon />} label="Categories" />

            <Tooltip title={user?.name || user?.email || "Account"}>
              <Avatar sx={{ width: 36, height: 36 }}>
                {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
              </Avatar>
            </Tooltip>

            <IconButton onClick={logout} color="inherit">
              <LogoutRoundedIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
