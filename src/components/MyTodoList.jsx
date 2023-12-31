import React, { useState } from "react";
import { Box, Select, MenuItem, Typography } from "@mui/material";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import { useSelector } from "react-redux";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RuleIcon from "@mui/icons-material/Rule";
import CountCard from "./CountCard";

export default function MyTodoList() {
  const todos = useSelector((state) => state.todoReducer.todos);

  const [filter, setFilter] = useState("All");
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "Completed":
        return todo.completed === true;
      case "Active":
        return todo.completed === false;
      case "High":
        return todo.priority === "High";
      case "Medium":
        return todo.priority === "Medium";
      case "Low":
        return todo.priority === "Low";
      default:
        return todo;
    }
  });

  return (
    <>
      <Typography variant="h5" fontWeight={"bolder"} textAlign="center" my={4}>
        My Todo List
      </Typography>

      <Box display={{ xs: "flex" }} gap={2}>
        <CountCard
          count={todos.length}
          text={"Total tasks"}
          icon={RuleIcon}
          iconColor={"primary"}
        />
        <CountCard
          count={todos.filter((todo) => todo.completed === true).length}
          text={"Completed tasks"}
          icon={CheckCircleIcon}
          iconColor={"success"}
        />
        <CountCard
          count={todos.filter((todo) => todo.priority === "High").length}
          text={"High priority tasks"}
          icon={NotificationImportantIcon}
          iconColor={"error"}
        />
      </Box>

      <Box
        display={{ xs: "block", lg: "flex" }}
        justifyContent={"space-between"}
        mt={5}
        gap={2}
      >
        <Box width={"100%"}>
          <AddTodo />
        </Box>
        <Select
          onChange={handleFilterChange}
          labelId="filter-select-label"
          id="filter-select"
          data-testid="todo-filter-select"
          value={filter}
          size="small"
          color="primary"
          sx={{ minWidth: { xs: "100%", lg: 200 }, mt: { xs: 2, lg: 0 } }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Completed">Completed Todos</MenuItem>
          <MenuItem value="Active">Active Todos</MenuItem>
          <MenuItem value="High">High Priority</MenuItem>
          <MenuItem value="Medium">Medium Priority</MenuItem>
          <MenuItem value="Low">Low Priority</MenuItem>
        </Select>
      </Box>
      <Box
        px={1}
        py={2}
        mt={2}
        sx={{
          maxHeight: "65vh",
          borderRadius: "10px",
          overflowY: "scroll",
        }}
      >
        <TodoItem todos={filteredTodos} filter={filter} />
      </Box>
    </>
  );
}
