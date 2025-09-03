import React, { useEffect, useState } from "react";
import {
  Grid, Card, CardContent, Typography, Stack, TextField, Button, IconButton, Box,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import api from "../api/client";
import ConfirmDialog from "../components/ConfirmDialog";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const load = async () => {
    const { data } = await api.get("/categories");
    setCategories(data?.data || data || []);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!name.trim()) return;
    if (editing) {
      await api.put(`/categories/${editing.id}`, { name });
      setEditing(null);
    } else {
      await api.post("/categories", { name });
    }
    setName("");
    await load();
  };

  const askDelete = (cat) => { setEditing(cat); setConfirmOpen(true); };
  const doDelete = async () => {
    if (editing?.id) await api.delete(`/categories/${editing.id}`);
    setConfirmOpen(false);
    setEditing(null);
    await load();
  };

  const startEdit = (cat) => { setEditing(cat); setName(cat.name); };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Categories</Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mb: 2 }}>
        <TextField
          label={editing ? "Rename category" : "New category"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ minWidth: 240 }}
        />
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={save}>
          {editing ? "Update" : "Add"}
        </Button>
        {editing && (
          <Button onClick={() => { setEditing(null); setName(""); }}>
            Cancel
          </Button>
        )}
      </Stack>

      <Grid container spacing={2}>
        {categories.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <Card>
              <CardContent sx={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <Typography variant="h6">{c.name}</Typography>
                <Stack direction="row">
                  <IconButton onClick={() => startEdit(c)}><EditRoundedIcon /></IconButton>
                  <IconButton onClick={() => askDelete(c)}><DeleteRoundedIcon /></IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={doDelete}
        title="Delete Category?"
        message={`This will remove "${editing?.name || ""}"from your categories.`}
      />
    </Box>
  );
}
