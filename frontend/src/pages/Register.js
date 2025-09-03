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

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register({ name, email, password, password_confirmation });
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>Create account</Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <TextField label="Confirm Password" type="password" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
              {error && <Typography color="error">{error}</Typography>}
              <Button type="submit" variant="contained" disabled={loading}>{loading ? "Creating..." : "Sign Up"}</Button>
              <Typography variant="body2">Already have an account? <MuiLink component={Link} to="/login">Login</MuiLink></Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
