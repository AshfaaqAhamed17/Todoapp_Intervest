import React from "react";
import { Input, Box, Button } from "@mui/material";

export default function AddTodo() {
  return (
    <>
      <Box>
        <Input
          label="Add Todo"
          placeholder="Add Todo"
          name="add_todo"
          variant="soft"
          sx={{ mt: 2, p: 2, borderRadius: "10px" }}
        />
        <Button
          size="lg"
          type="submit"
          //   variant="solid"
          color="primary"
          //   sx={{
          //     background: "blue",
          //     color: "white",
          //     borderRadius: "10px",
          //     "&:hover": {
          //       background: "green",
          //     },
          //   }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
}
