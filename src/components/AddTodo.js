import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";

export default function AddTodo() {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const disableSubmit = inputText === "" ? true : false;

  const handleInputChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputText);
    const data = {
      id: Math.floor(Math.random() * 1000),
      title: inputText,
      userId: 11,
      completed: false,
    };
    dispatch({ type: "ADD_TODO", payload: data });
    console.log(data);
    setInputText("");
  };

  return (
    <>
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
