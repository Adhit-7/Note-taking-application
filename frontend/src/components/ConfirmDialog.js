import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function ConfirmDialog({ open, title = "Confirm", message, onCancel, onConfirm }) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" color="error" onClick={onConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
