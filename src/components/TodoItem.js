import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import MuiAlert from "@mui/material/Alert";

export default function TodoItem({ todos }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleCompletedToggle = (id, completed) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) {
      setSnackbarMessage("Todo not found. Unable to update status.");
      setIsError(true);
      setSnackbarOpen(true);
      return;
    }

    try {
      dispatch({ type: "UPDATE_TODO", payload: { id, completed: !completed } });
      setSnackbarMessage(
        completed
          ? "Todo marked as not completed!"
          : "Todo marked as completed!"
      );
      setIsError(false);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error updating todo status.");
      setIsError(true);
      setSnackbarOpen(true);
    }
  };

  const handleDelete = (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (!todoToDelete) {
      setSnackbarMessage("Todo not found. Unable to delete.");
      setIsError(true);
      setSnackbarOpen(true);
      return;
    }

    try {
      dispatch({ type: "DELETE_TODO", payload: id });
      setSnackbarMessage("Todo deleted successfully!");
      setIsError(false);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error deleting todo.");
      setIsError(true);
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditedTodo(todoToEdit);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditedTodo(null);
  };

  const handleSaveEdit = () => {
    try {
      dispatch({ type: "UPDATE_TODO", payload: editedTodo });
      setSnackbarMessage("Todo edited successfully!");
      setIsError(false);
      setSnackbarOpen(true);
      setOpen(false);
      setEditedTodo(null);
    } catch (error) {
      setSnackbarMessage("Error saving edited todo.");
      setIsError(true);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={isError ? "error" : "success"}
          onClose={handleSnackbarClose}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      {todos.length === 0 ? (
        <Typography>No Todos</Typography>
      ) : (
        todos.map((todo) => (
          <Box
            key={todo.id}
            my={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={todo.completed}
                onChange={() => handleCompletedToggle(todo.id, todo.completed)}
              />
              <Typography
                variant="body1"
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#a3a3a3" : "black",
                }}
              >
                {todo.title}
              </Typography>
            </Box>
            <Box>
              <Button onClick={() => handleDelete(todo.id)}>
                <DeleteIcon />
              </Button>
              <Button onClick={() => handleEdit(todo.id)}>
                <EditIcon />
              </Button>
            </Box>
          </Box>
        ))
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              fullWidth
              variant="outlined"
              label="Edit Todo"
              value={editedTodo ? editedTodo.title : ""}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, title: e.target.value })
              }
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
