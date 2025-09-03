import React from "react";
import {
  Card, CardContent, CardActions, Typography, IconButton, Stack, Chip,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>{note.title}</Typography>
        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>{note.content}</Typography>
        {Array.isArray(note.categories) && note.categories.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
            {note.categories.map((cat) => (
              <Chip key={cat.id || cat} size="small" label={cat.name || cat} />
            ))}
          </Stack>
        )}
      </CardContent>
      <CardActions>
        <IconButton onClick={() => onEdit(note)}><EditRoundedIcon /></IconButton>
        <IconButton onClick={() => onDelete(note)}><DeleteRoundedIcon /></IconButton>
      </CardActions>
    </Card>
  );
}
