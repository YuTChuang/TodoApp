import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStatus, setEditStatus] = useState(0);

  // 取得所有 Todo
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5125/api/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Fetch todos error:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 新增 Todo
  const addTodo = async () => {
    if (!newTitle) return;
    try {
      await axios.post("http://localhost:5125/api/todos", {
        title: newTitle,
        description: newDesc,
        status: 0, // 預設 To Do
      });
      setNewTitle("");
      setNewDesc("");
      fetchTodos();
    } catch (err) {
      console.error("Add todo error:", err);
    }
  };

  // 更新 Todo
  const updateTodo = async (id) => {
    try {
      await axios.put(`http://localhost:5125/api/todos/${id}`, {
        title: editTitle,
        description: editDesc,
        status: editStatus,
        id: id,
      });
      setEditingId(null);
      fetchTodos();
    } catch (err) {
      console.error("Update todo error:", err);
    }
  };

  // 刪除 Todo
  const deleteTodo = async (id) => {
    // 跳出確認視窗
    const confirmDelete = window.confirm("確定要刪除這張卡片嗎？");
    if (!confirmDelete) return; // 如果按取消，就不刪除

    try {
      await axios.delete(`http://localhost:5125/api/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error("Delete todo error:", err);
    }
  };

  const statuses = [
    { id: 0, title: "To Do", color: "bg-red-200" },
    { id: 1, title: "In Progress", color: "bg-yellow-200" },
    { id: 2, title: "In Review", color: "bg-blue-200" },
    { id: 3, title: "Done", color: "bg-green-200" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">My Todo Board</h1>

      {/* 新增 Todo */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-2">Card Title*</h3>
        <input
          className="border p-2 w-full rounded mb-2"
          placeholder="Enter task title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <h3 className="text-lg font-semibold mb-2">Card Description</h3>
        <input
          className="border p-2 w-full rounded mb-2"
          placeholder="Enter task description..."
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          onClick={addTodo}
        >
          Create Todo Task
        </button>
      </div>

      {/* 狀態欄位 */}
      <div className="grid grid-cols-4 gap-4">
        {statuses.map((status) => (
          <div
            key={status.id}
            className="p-4 rounded-lg shadow-md min-h-[400px]"
          >
            <h2 className="text-lg font-semibold mb-4">{status.title}</h2>
            {todos
              .filter((t) => t.status === status.id)
              .map((todo) => (
                <div
                  key={todo.id}
                  className={`p-3 mb-2 rounded-lg shadow ${status.color}`}
                >
                  {editingId === todo.id ? (
                    <>
                      <input
                        className="border p-1 w-full mb-1 rounded"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                      <input
                        className="border p-1 w-full mb-1 rounded"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                      />
                      <select
                        className="border p-1 w-full mb-1 rounded"
                        value={editStatus}
                        onChange={(e) => setEditStatus(parseInt(e.target.value))}
                      >
                        {statuses.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        onClick={() => updateTodo(todo.id)}
                      >
                        儲存
                      </button>
                      <button
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                        onClick={() => setEditingId(null)}
                      >
                        取消
                      </button>
                    </>
                  ) : (
                    <>
                      <h4 className="font-bold">{todo.title}</h4>
                      <p className="text-sm">{todo.description}</p>
                      <div className="mt-2">
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                          onClick={() => {
                            setEditingId(todo.id);
                            setEditTitle(todo.title);
                            setEditDesc(todo.description);
                            setEditStatus(todo.status);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
