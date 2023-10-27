import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Checkbox,
  Typography,
  Dialog,
  IconButton,
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
import axios from "axios";

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
      localStorage.setItem(
        "todos",
        JSON.stringify(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        ) // todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
      );
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
      axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((res) => {
          console.log(res.data);
          dispatch({ type: "DELETE_TODO", payload: id });
          localStorage.setItem(
            "todos",
            JSON.stringify(todos.filter((todo) => todo.id !== id))
          );
          setSnackbarMessage("Todo deleted successfully!");
          setIsError(false);
          setSnackbarOpen(true);
        })
        .catch((err) => {
          console.log(err);
          setSnackbarMessage("Error deleting todo.");
          setIsError(true);
          setSnackbarOpen(true);
        });
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
    /**
     *     try {
      axios
        .put(`https://jsonplaceholder.typicode.com/todos/${editedTodo.id}`, {
          title: editedTodo.title,
          completed: editedTodo.completed,
        })
        .then((res) => {
          console.log(res.data);
          dispatch({ type: "UPDATE_TODO", payload: res.data });
          setSnackbarMessage("Todo edited successfully!");
          setIsError(false);
          setSnackbarOpen(true);
          setOpen(false);
          setEditedTodo(null);
        })
        .catch((err) => {
          console.log(err);
          setSnackbarMessage("Error saving edited todo.");
          setIsError(true);
          setSnackbarOpen(true);
        });
    } catch (error) {
      setSnackbarMessage("Error saving edited todo.");
      setIsError(true);
      setSnackbarOpen(true);
    }
     */
    try {
      dispatch({ type: "UPDATE_TODO", payload: editedTodo });
      localStorage.setItem(
        "todos",
        JSON.stringify(
          todos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
        )
      );
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
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display={"flex"} alignItems="center">
                <Checkbox
                  checked={todo.completed}
                  onChange={() =>
                    handleCompletedToggle(todo.id, todo.completed)
                  }
                />
                <Typography
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#a3a3a3" : "black",
                    cursor: "pointer",
                  }}
                  variant="body2"
                  onClick={() => handleCompletedToggle(todo.id, todo.completed)}
                >
                  {todo.title}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton onClick={() => handleDelete(todo.id)} color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleEdit(todo.id)} color="primary">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            {todo.id !== todos[todos.length - 1].id && (
              <Divider sx={{ my: 2 }} />
            )}
          </>
        ))
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              style={{ marginTop: "0.5rem" }}
              fullWidth
              autoFocus
              variant="outlined"
              multiline
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
          <Button
            disabled={!editedTodo || editedTodo.title === ""}
            onClick={handleSaveEdit}
            color="success"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
