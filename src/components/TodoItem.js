import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  IconButton,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  InputLabel,
  FormControlLabel,
  Tooltip,
  Switch,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { styled } from "@mui/material/styles";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { fetchTodo } from "../redux/action/todoAction";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function TodoItem({ todos }) {
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&:after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

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
        )
      );
    } catch (error) {
      setSnackbarMessage("Error updating todo status.");
      setIsError(true);
      setSnackbarOpen(true);
    }
  };

  const handleDelete = (id) => {
    console.log("id", id);
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
          setSnackbarMessage("Error deleting todo. 111");
          setIsError(true);
          setSnackbarOpen(true);
        });
    } catch (error) {
      console.log(error);
      setSnackbarMessage("Error deleting todo. 222");
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

  const formatDate = (dateString) => {
    const [datePart, timePart] = dateString.split(", ");
    const [formattedDateStr, amPm] = timePart.split(" ");
    const [hours, minutes] = formattedDateStr.split(":");

    console.log("formatted Date:", datePart); // Output: Date: 22/09
    console.log("formatted Time:", `${hours}:${minutes} ${amPm}`); // Output: Time: 10:09 PM

    return `${datePart} - ${hours}:${minutes} ${amPm}`;
  };

  const handlePriorityChange = (e) => {
    setEditedTodo({
      ...editedTodo,
      priority: e.target.value,
    });
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
        <Box
          sx={{
            background: "#f9f9f9",
            py: 1,
            my: 1,
            px: 2,
            borderRadius: "10px",
          }}
        >
          <Typography variant="h4" fontWeight={"bolder"} textAlign={"center"}>
            No Todos
          </Typography>
        </Box>
      ) : (
        <>
          <DragDropContext
            onDragEnd={(params) => {
              const sourceIndex = params.source.index;
              const destinationIndex = params.destination?.index;
              if (destinationIndex) {
                const reorderTodos = [...todos];
                const [removed] = reorderTodos.splice(sourceIndex, 1);
                reorderTodos.splice(destinationIndex, 0, removed);
                dispatch(fetchTodo(reorderTodos));
                localStorage.setItem("todos", JSON.stringify(reorderTodos));
              }
            }}
          >
            <Droppable droppableId="todo-1">
              {(provided, _) => (
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                  {todos.map((todo, i) => (
                    <Draggable
                      key={todo.id}
                      draggableId={"draggable-" + todo.id}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            background: "#f9f9f9",
                            py: 1,
                            my: 1,
                            px: 2,
                            borderRadius: "10px",
                          }}
                          style={{
                            ...provided.draggableProps.style,
                            boxShadow: snapshot.isDragging
                              ? "0 0 .4rem #666"
                              : "none",
                          }}
                        >
                          <DragHandleIcon
                            color="primary"
                            fontSize="small"
                            {...provided.dragHandleProps}
                          />
                          <Typography
                            variant="caption"
                            sx={{ color: "gray", px: { xs: 1, lg: 2 } }}
                            fontWeight={"bolder"}
                          >
                            {todo.createdDate
                              ? formatDate(todo.createdDate)
                              : "22/09/2023 - 10.09 PM"}
                          </Typography>
                          <Box
                            display="flex"
                            alignItems="start"
                            justifyContent="space-between"
                          >
                            <Box display={"flex"} alignItems="start">
                              <Tooltip
                                title={
                                  todo.completed
                                    ? "Task Complete"
                                    : "Task Incomplete"
                                }
                              >
                                <FormControlLabel
                                  control={<Android12Switch />}
                                  checked={todo.completed}
                                  sx={{ ml: 0.5 }}
                                  onChange={() =>
                                    handleCompletedToggle(
                                      todo.id,
                                      todo.completed
                                    )
                                  }
                                />
                              </Tooltip>
                              <Typography
                                sx={{
                                  textDecoration: todo.completed
                                    ? "line-through"
                                    : "none",
                                  color: todo.completed ? "#a3a3a3" : "black",
                                  cursor: "pointer",
                                  mt: 1,
                                }}
                                variant="body2"
                                onClick={() =>
                                  handleCompletedToggle(todo.id, todo.completed)
                                }
                              >
                                {todo.title}
                              </Typography>
                            </Box>

                            <Box display="flex" alignItems="center">
                              <Tooltip
                                title={
                                  todo.priority === "High"
                                    ? "High Priority"
                                    : todo.priority === "Medium"
                                    ? "Medium Priority"
                                    : "Low Priority"
                                }
                              >
                                <Box
                                  px={1}
                                  pt={1}
                                  mr={0.5}
                                  sx={{
                                    background: "#fff",
                                    borderRadius: "100px",
                                  }}
                                >
                                  {todo.priority === "High" ? (
                                    <KeyboardDoubleArrowUpIcon
                                      color="error"
                                      fontSize="small"
                                    />
                                  ) : todo.priority === "Medium" ? (
                                    <DragHandleIcon
                                      color="warning"
                                      fontSize="small"
                                    />
                                  ) : (
                                    <KeyboardDoubleArrowDownIcon
                                      color="success"
                                      fontSize="small"
                                    />
                                  )}
                                </Box>
                              </Tooltip>
                              <Tooltip title="Edit Todo">
                                <IconButton
                                  onClick={() => handleEdit(todo.id)}
                                  color="primary"
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Del Todo">
                                <IconButton
                                  onClick={() => handleDelete(todo.id)}
                                  color="error"
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </>
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
              value={editedTodo ? editedTodo.title : ""}
              multiline
              label="Edit Todo"
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, title: e.target.value })
              }
            />
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel id="demo-select-small-label">Priority</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Priority"
                value={editedTodo ? editedTodo.priority : "Low"}
                onChange={handlePriorityChange}
              >
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
              </Select>
            </FormControl>
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
