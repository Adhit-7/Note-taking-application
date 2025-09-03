import React, { useEffect, useMemo, useState } from "react";
import {
  Grid, Button, Stack, MenuItem, TextField, Typography, Box,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import api from "../api/client";
import NoteCard from "../components/NoteCard";
import NoteDialog from "../components/NoteDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import SearchBar from "../components/SearchBar";
import { CircularProgress } from "@mui/material";


export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");

  const [loading, setloading] = useState(false);

  const loadAll = async () => {
    setloading(true);

    try {
      const [nRes, cRes] = await Promise.all([
        api.get("/notes", { params: { search, category_id: filterCat || undefined } }),
        api.get("/categories"),
      ]);
      setNotes(nRes.data?.data || nRes.data || []);
      setCategories(cRes.data?.data || cRes.data || []);
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);
  useEffect(() => { loadAll(); }, [search, filterCat]);

  const openCreate = () => {
    setEditing({ title: "", content: "", category_id: "" });
    setDialogOpen(true);
  };

  const openEdit = (note) => {
    setEditing({
      ...note,
      category_id: note.category_id || "",
    });
    setDialogOpen(true);
  };

  const handleSave = async (payload) => {
    if (!payload.title?.trim()) return alert("Title cannot be empty.");
    if (!payload.content?.trim()) return alert("Content cannot be empty.");

    const dataToSend = {
      title: payload.title,
      content: payload.content,
      category_id: payload.category_id || null,
    };

    try {
      if (payload.id) {
        await api.put(`/notes/${payload.id}`, dataToSend);
      } else {
        await api.post("/notes", dataToSend);
      }
      setDialogOpen(false);
      await loadAll();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save note.");
    }
  };

  const askDelete = (note) => {
    setToDelete(note);
    setConfirmOpen(true);
  };

  const doDelete = async () => {
    try {
      if (toDelete?.id) await api.delete(`/notes/${toDelete.id}`);
      setConfirmOpen(false);
      setToDelete(null);
      await loadAll();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const filtered = useMemo(() => notes, [notes]);

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">Your Notes</Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ width: { xs: "100%", sm: "auto" } }}>
          <TextField
            select
            size="small"
            label="Category"
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
          </TextField>
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={openCreate}>New Note</Button>
        </Stack>
      </Stack>

      <SearchBar value={search} onChange={setSearch} />

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="50vh"
          flexDirection="column"
        >
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((n) => (
            <Grid item xs={12} sm={6} md={4} key={n.id}>
              <NoteCard note={n} onEdit={openEdit} onDelete={askDelete} />
            </Grid>
          ))}
        </Grid>
      )}

      <NoteDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        categories={categories}
        initial={editing}
      />

      <ConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={doDelete}
        title="Delete Note?"
        message={`This will permanently delete "${toDelete?.title || ""}".`}
      />
    </Box >

  );
}
