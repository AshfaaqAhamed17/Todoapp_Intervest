import api from "./api";

const getTodo = () => {
  return api.get(`/todos?_limit=5`);
};

const addTodo = async (todo) => {
  try {
    const res = await api.post(`/todos`, todo);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.status);
  }
};

const deleteTodo = async (id) => {
  try {
    const res = await api.delete(`/todos/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.status);
  }
};
const updateTodo = async (id, todo) => {
  try {
    const res = await api.put(`/todos/${id}`, todo);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.status);
  }
};
const getTodoById = async (id) => {
  try {
    const res = await api.get(`/todos/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.status);
  }
};

const todoService = {
  getTodo,
  addTodo,
  deleteTodo,
  updateTodo,
  getTodoById,
};

export default todoService;

// Compare this snippet from src/redux/actions/todoAction.js:
// import todoApi from "../../services/todoService";
//
// export const fetchTodo = () => async (dispatch) => {
//   const response = await todoApi.getTodo();
//   dispatch({ type: "FETCH_TODO", payload: response.data });
// };
