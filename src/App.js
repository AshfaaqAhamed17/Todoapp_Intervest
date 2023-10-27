import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import MyTodoList from "./components/MyTodoList";
import { useDispatch } from "react-redux";
import { fetchTodo } from "./redux/action/todoAction";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      dispatch(fetchTodo(storedTodos));
      setLoading(false);
    } else {
      axios
        .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
        .then((res) => {
          console.log(res.data);
          res.data.forEach((todo) => {
            todo.priority = "Low";
          });
          console.log("res.data", res.data);
          dispatch(fetchTodo(res.data));
          localStorage.setItem("todos", JSON.stringify(res.data));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              width: { xs: "100%", lg: "60%" },
              margin: "auto",
            }}
          >
            <MyTodoList />
          </Box>
        </>
      )}
    </>
  );
}

export default App;
