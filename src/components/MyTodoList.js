import React, { useState } from "react";
import { Box, Grid, Select, MenuItem, Typography } from "@mui/material";
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
      <Typography variant="h5" fontWeight={"bold"} textAlign="center" my={2}>
        My Todo List
      </Typography>
      <Box display={"flex"} justifyContent={"space-between"} mt={5} gap={2}>
        <Box width={"100%"}>
          <AddTodo />
        </Box>
        <Select
          onChange={handleFilterChange}
          labelId="filter-select-label"
          id="filter-select"
          value={filter}
          size="small"
          color="primary"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Completed">Completed Todos</MenuItem>
          <MenuItem value="Active">Active Todos</MenuItem>
        </Select>
      </Box>
      <Box
        px={1}
        py={2}
        mt={2}
        sx={{ background: "#f9f9f9", borderRadius: "10px" }}
      >
        <TodoItem todos={filteredTodos} />
      </Box>
    </>
  );
}
