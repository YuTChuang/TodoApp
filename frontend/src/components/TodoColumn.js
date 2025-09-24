import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";

export default function TodoColumn({ column, todos }) {
  return (
    <div className="bg-gray-100 p-2 rounded min-w-[250px] flex-shrink-0">
      <h2 className="font-bold mb-2">{column.title}</h2>
      <Droppable droppableId={String(column.id)}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[100px]"
          >
            {todos.map((todo, index) => (
              <TodoCard key={todo.id} todo={todo} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
