// import { ProviderId } from "firebase/auth";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {v4 as uuid} from 'uuid'
import { useState } from "react";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
];

const columnsFromBackend = [
  {
    [uuid()]: {
      name: "Requests",
      items: [itemsFromBackend],
    },
    [uuid()]: {
      name: "Todo",
      items: [],
    },
    [uuid()]: {
      name: "In Progress",
      items: [],
    },
    [uuid()]: {
      name: "Done",
      items: [],
    },
  },
];

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId]
        const destColumn = columns[destination.droppableId]
        const sourceItems = [...sourceColumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
         setColumns({
           ...columns,
           [source.droppableId]: {
             ...sourceColumn,
             items: sourceItems,
           },
           [destination.droppableId]: {
             ...destColumn,
             items: destItems,
           },
         });

    } else {
         const column = columns[source.droppableId];
         const copiedItems = [...column.item];
         const [removed] = copiedItems.splice(source.index, 1);
         copiedItems.splice(destination.index, 0, removed);
         setColumns({
           ...columns,
           [source.droppableId]: {
             ...column,
             items: copiedItems,
           },
         });
    }
   
}

const Kanban = () => {
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <div className="flex justify-center h-screen ">
      <DragDropContext onDragEnd={(result) => onDragEnd(result,columns,setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
            return(
              <div className="flex flex-col items-center">
              <h2>{column.name}</h2>
              <div style={{margin:8}}>
                <Droppable droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue" : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0,0,8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? " 26384A "
                                        : "456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
              ;
            </div>
            )
        })}
      </DragDropContext>
    </div>
  );
};

export default Kanban;
