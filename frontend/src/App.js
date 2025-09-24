import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import NewTodoForm from "./components/NewTodoForm";
import TodoColumn from "./components/TodoColumn";
import { getTodos, updateTodoStatus } from "./api/todoApi";

const columns = [
  { id: 0, title: "To Do" },
  { id: 1, title: "In Progress" },
  { id: 2, title: "In Review" },
  { id: 3, title: "Done" },
];

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const todoId = parseInt(draggableId);
    const newStatus = parseInt(destination.droppableId);

    await updateTodoStatus(todoId, newStatus);
    fetchTodos();
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">TodoApp</h1>
      <NewTodoForm refresh={fetchTodos} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 mt-4 overflow-x-auto">
          {columns.map((col) => (
            <TodoColumn
              key={col.id}
              column={col}
              todos={todos.filter((t) => t.status === col.id)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
