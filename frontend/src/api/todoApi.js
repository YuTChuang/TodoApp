import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5125/api/todos" // 對應你的後端 port
});

export const getTodos = async () => {
  try {
    const res = await api.get("/");
    return res.data;
  } catch (err) {
    console.error("抓取 Todo 失敗:", err);
    throw err;
  }
};

export const createTodo = async (todo) => {
  try {
    const payload = {
      title: todo.title,
      description: todo.description,
      Status: todo.status ?? 0,
    };
    const res = await api.post("/", payload);
    return res.data;
  } catch (err) {
    console.error("新增 Todo 失敗:", err);
    throw err;
  }
};

export const updateTodoStatus = async (id, status) => {
  try {
    const res = await api.patch(`/${id}`, { Status: status });
    return res.data;
  } catch (err) {
    console.error("更新 Todo 狀態失敗:", err);
    throw err;
  }
};
