import api from "./api";

const getTodo = (limit) => {
  return api.get(`/todos?_limit=${limit}`);
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
