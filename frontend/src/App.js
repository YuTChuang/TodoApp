import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // 抓取所有 Todo
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

  // 拖拉事件
  const onDragEnd = async (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    // 如果拖到新增欄位，忽略
    if (destination.droppableId === "add") return;

    const todoId = parseInt(draggableId, 10);
    const newStatus = parseInt(destination.droppableId, 10);
    const target = todos.find((t) => t.id === todoId);
    if (!target) return;

    try {
      await axios.put(`http://localhost:5125/api/todos/${todoId}`, {
        ...target,
        status: newStatus,
      });
      fetchTodos();
    } catch (err) {
      console.error("Update todo error:", err);
    }
  };

  // 欄位定義
  const columns = [
    { id: "add", title: "新增 To Do Task" },
    { id: "0", title: "To Do" },
    { id: "1", title: "In Progress" },
    { id: "2", title: "In Review" },
    { id: "3", title: "Done" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">My Todo Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-5 gap-4">
          {columns.map((col) => (
            <Droppable key={col.id} droppableId={col.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-4 bg-gray-100 rounded-lg shadow-md min-h-[400px]"
                >
                  <h2 className="text-lg font-semibold mb-4">
                    {col.title}
                  </h2>

                  {col.id === "add" ? (
                    <div className="space-y-2">
                      <input
                        className="border p-2 w-full rounded"
                        placeholder="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                      />
                      <input
                        className="border p-2 w-full rounded"
                        placeholder="Description"
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                      />
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                        onClick={addTodo}
                      >
                        新增 To Do Task 卡片
                      </button>
                    </div>
                  ) : (
                    todos
                      .filter((t) => t.status.toString() === col.id)
                      .map((todo, index) => (
                        <Draggable
                          key={todo.id}
                          draggableId={todo.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-3 mb-2 rounded-lg shadow cursor-pointer"
                            >
                              <h4 className="font-bold">{todo.title}</h4>
                              <p className="text-sm">{todo.description}</p>
                            </div>
                          )}
                        </Draggable>
                      ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
