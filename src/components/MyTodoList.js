import React, { useState } from "react";
import { Box, Select, MenuItem, Typography } from "@mui/material";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import { useSelector } from "react-redux";

export default function MyTodoList() {
  const todos = useSelector((state) => state.todoReducer.todos);
  const [filter, setFilter] = useState("All");
  const handleFilterChange = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Completed") {
      return todo.completed === true;
    } else if (filter === "Active") {
      return todo.completed === false;
    } else {
      return todo;
    }
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h3" textAlign="center" my={2}>
          Todo App
        </Typography>
        <Box
          sx={{ display: "flex", gap: 12, justifyContent: "flex-end", pt: 2 }}
        >
          <AddTodo />
          <Select
            onChange={handleFilterChange}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            sx={{ minWidth: 180, borderRadius: "10px" }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Completed">Completed Todos</MenuItem>
            <MenuItem value="Active">Active Todos</MenuItem>
          </Select>
        </Box>
        <TodoItem todos={filteredTodos} />
      </Box>
    </>
  );
}
