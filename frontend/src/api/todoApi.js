import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/todos" // 根據後端修改
});

export const getTodos = async () => {
  const res = await api.get("/");
  return res.data;
};

export const createTodo = async (todo) => {
  const res = await api.post("/", todo);
  return res.data;
};

export const updateTodoStatus = async (id, status) => {
  const res = await api.patch(`/${id}`, { status });
  return res.data;
};
