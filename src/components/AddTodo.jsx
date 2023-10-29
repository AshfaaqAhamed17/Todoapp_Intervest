import React, { useState } from "react";
import todoService from "../services/todoService";
import { TextField, Box, Button, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";

export default function AddTodo() {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const disableSubmit = inputText === "" ? true : false;

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const currentDate = new Date();
    const options = { timeZone: "Asia/Kolkata" };
    const formattedDate = currentDate.toLocaleString("en-US", options);

    todoService
      .addTodo({
        title: inputText,
        userId: 11,
        completed: false,
        priority: "Low",
        createdDate: formattedDate,
      })
      .then((res) => {
        setLoading(false);

        const data = {
          id: res.id * Math.floor(Math.random() * 1000),
          title: res.title,
          userId: res.userId,
          completed: res.completed,
          createdDate: res.createdDate,
          priority: res.priority,
        };
        dispatch({ type: "ADD_TODO", payload: data });
        setSnackbarMessage("Todo created successfully!");
        setIsError(false);
        setSnackbarOpen(true);
        const todos = JSON.parse(localStorage.getItem("todos"));
        todos.push(data);
        localStorage.setItem("todos", JSON.stringify(todos));
      })
      .catch((err) => {
        setLoading(false);
        setSnackbarMessage("Unable to create todo.");
        setIsError(true);
        setSnackbarOpen(true);
      });
    setInputText("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      {loading && (
        <LinearProgress
          sx={{ position: "fixed", top: 0, left: 0, width: "100vw", height: 8 }}
        />
      )}
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
      <form onSubmit={handleSubmit}>
        <Box display={"flex"} gap={1}>
          <TextField
            label="Enter task"
            // sx={{ borderRadius: "50px" }}
            InputProps={{
              style: {
                borderRadius: "100px",
              },
            }}
            name="add_todo"
            variant="outlined"
            size="small"
            fullWidth
            px={2}
            value={inputText}
            onChange={handleInputChange}
          />

          <Button
            size="small"
            type="submit"
            color="primary"
            variant="contained"
            disabled={disableSubmit}
            sx={{ borderRadius: "50px" }}
          >
            Add
          </Button>
        </Box>
      </form>
    </>
  );
}
