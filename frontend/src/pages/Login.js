import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>Welcome back</Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {error && <Typography color="error">{error}</Typography>}
              <Button type="submit" variant="contained" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
              <Typography variant="body2">No account? <MuiLink component={Link} to="/register">Register</MuiLink></Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
