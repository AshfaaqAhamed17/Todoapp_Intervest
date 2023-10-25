import React from "react";
import Box from "@mui/material/Box";
import Todo from "./Todo";
import AddTodo from "./AddTodo";

export default function MyTodoList(props) {
  const { todos } = props;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <AddTodo />
        <Todo todos={todos} />
      </Box>
    </>
  );
}
