import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function TodoCard({ todo, index }) {
  return (
    <Draggable draggableId={String(todo.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-2 rounded shadow mb-2"
        >
          <h3 className="font-bold">{todo.title}</h3>
          <p>{todo.description}</p>
        </div>
      )}
    </Draggable>
  );
}
