import todoReducer from "../../redux/reducer/todoReducer";

describe("todoReducer", () => {
  it("should handle FETCH_TODO", () => {
    const initialState = { todos: [] };
    const todos = [
      { id: 1, title: "Todo 1" },
      { id: 2, title: "Todo 2" },
    ];
    const action = { type: "FETCH_TODO", payload: todos }; // Use the correct action type
    const newState = todoReducer(initialState, action);
    expect(newState).toEqual({ todos }); // Now, this should match as expected
  });

  it("should handle ADD_TODO", () => {
    const initialState = { todos: [] };
    const newTodo = { id: 1, title: "New Todo" };
    const action = { type: "ADD_TODO", payload: newTodo };
    const newState = todoReducer(initialState, action);
    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0]).toEqual(newTodo);
  });

  it("should handle UPDATE_TODO", () => {
    const initialState = {
      todos: [{ id: 1, title: "Todo", completed: false }],
    };
    const updatedTodo = { id: 1, title: "Updated Todo", completed: true };
    const action = { type: "UPDATE_TODO", payload: updatedTodo };
    const newState = todoReducer(initialState, action);
    expect(newState.todos[0]).toEqual(updatedTodo);
  });

  it("should handle DELETE_TODO", () => {
    const initialState = { todos: [{ id: 1, title: "Todo" }] };
    const action = { type: "DELETE_TODO", payload: 1 };
    const newState = todoReducer(initialState, action);
    expect(newState.todos).toHaveLength(0);
  });
});
