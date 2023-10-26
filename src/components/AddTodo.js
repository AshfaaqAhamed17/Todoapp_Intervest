import React, { useState } from "react";
import { Input, Box, Button } from "@mui/material";
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
      <Box>
        <form onSubmit={handleSubmit}>
          <Input
            label="Add Todo"
            placeholder="Add Todo"
            name="add_todo"
            variant="soft"
            sx={{ mt: 2, px: 2, borderRadius: "10px" }}
            value={inputText}
            onChange={handleInputChange}
          />
          <Button
            size="lg"
            type="submit"
            color="primary"
            disabled={disableSubmit}
          >
            Add
          </Button>
        </form>
      </Box>
    </>
  );
}
