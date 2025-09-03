import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, MenuItem } from "@mui/material";

export default function NoteDialog({ open, onClose, onSave, categories, initial }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const [categoryId, setCategoryId] = useState(initial?.category_id || "");

  useEffect(() => {
    setTitle(initial?.title || "");
    setContent(initial?.content || "");
    setCategoryId(initial?.category_id || "");
  }, [initial, open]);

  const handleSave = () => {
    onSave({ ...initial, title, content, category_id: categoryId });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initial?.id ? "Edit Note" : "New Note"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <TextField label="Content" value={content} onChange={(e) => setContent(e.target.value)} multiline minRows={4} />
          <TextField
            select
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <MenuItem value="">Select Category</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
