import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getTodos, createTodo, updateTodoStatus } from "./api/todoApi";

const columnsMap = ["To Do", "In Progress", "In Review", "Done"];

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      alert("無法連線到後端 API");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodo.title) return;
    try {
      await createTodo({ ...newTodo, status: 0 });
      setNewTodo({ title: "", description: "" });
      fetchTodos();
    } catch (err) {
      alert("新增失敗");
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const todoId = parseInt(draggableId);
    const newStatus = parseInt(destination.droppableId);

    try {
      await updateTodoStatus(todoId, newStatus);
      fetchTodos();
    } catch (err) {
      alert("更新狀態失敗");
    }
  };

  const getTodosByStatus = (status) =>
    todos.filter((t) => t.status === status || t.Status === status);

  return (
    <div className="p-6 flex gap-4 overflow-x-auto">
      <div className="min-w-[250px]">
        <h2 className="text-lg font-bold">新增 To Do</h2>
        <input
          className="border p-1 w-full mb-1"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <textarea
          className="border p-1 w-full mb-1"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <button
          className="bg-blue-500 text-white p-2 w-full"
          onClick={handleAddTodo}
        >
          新增 To Do Task 卡片
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        {columnsMap.map((col, idx) => (
          <Droppable droppableId={idx.toString()} key={idx}>
            {(provided) => (
              <div
                className="min-w-[250px] bg-gray-100 p-2 rounded"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="text-lg font-bold mb-2">{col}</h2>
                {getTodosByStatus(idx).map((todo, index) => (
                  <Draggable
                    draggableId={todo.id.toString()}
                    index={index}
                    key={todo.id}
                  >
                    {(provided) => (
                      <div
                        className="p-2 mb-2 bg-white rounded shadow"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h3 className="font-semibold">{todo.title}</h3>
                        <p>{todo.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
