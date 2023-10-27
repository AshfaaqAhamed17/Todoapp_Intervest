import React, { useState } from "react";
import { TextField, Box, Button, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";

export default function AddTodo() {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const disableSubmit = inputText === "" ? true : false;

  const handleInputChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputText);
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: inputText,
        userId: 11,
        completed: false,
      })
      .then((res) => {
        console.log(res.data.id * Math.floor(Math.random() * 1000));

        const data = {
          id: res.data.id * Math.floor(Math.random() * 1000),
          title: res.data.title,
          userId: res.data.userId,
          completed: res.data.completed,
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
        console.log(err);
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
            multiline
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
