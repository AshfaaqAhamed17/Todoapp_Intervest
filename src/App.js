import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import MyTodoList from "./components/MyTodoList";
import { useDispatch } from "react-redux";
import { fetchTodo } from "./redux/action/todoAction";
import { Typography } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => {
        console.log(res.data);
        dispatch(fetchTodo(res.data));
        setLoading(false);
      });
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
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          > */}

          <MyTodoList />
          {/* </Box> */}
        </>
      )}
    </>
  );
}

export default App;
