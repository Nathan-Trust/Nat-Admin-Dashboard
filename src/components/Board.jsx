import { useEffect, useState } from "react";
import styled from "styled-components";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddColumn from "./AddColumn";
import firebase from 'firebase/app';
import 'firebase/firestore';

/* const storeJSONData = (userId, jsonData) => {
  const db = firebase.firestore();
  const userRef = db.collection('users').doc(userId);
  userRef.set({ jsonData }); // Store the JSON data under a field called "jsonData"
};

 */

function Board(props) {
  const initialData = { tasks: {}, columns: {}, columnOrder: [] };
  const [board, setBoard] = useState(initialData);
  

  useEffect(() => {
    fetchBoard().then((data) => setBoard(data));
  }, []);

  async function fetchBoard() {
    
    const response = await fetch("http://127.0.0.1:8000/board");
    const data = await response.json();
    console.log(data);
    return data.board;
  }

  function onDragEnd(result) {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
    

      setBoard({
        ...board,
        columnOrder: newColumnOrder,
      });
      return;
    }

    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];


    if (start === finish) {
      const newTasksIds = Array.from(start.taskIds);
      newTasksIds.splice(source.index, 1);
      console.log(source.index)
      newTasksIds.splice(destination.index, 0, draggableId);
      console.log(destination.index)

      
      const newColumn = {
        ...start,
        taskIds: newTasksIds,
      };

      setBoard({
        ...board,
        columns: {
          ...board.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStartColumn = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinishColumn = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setBoard({
      ...board,
      columns: {
        ...board.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AddColumn board={board} setBoard={setBoard} />
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="block md:flex md:flex-wrap"
          >
            {board.columnOrder.map((columnId, index) => {
              const column = board.columns[columnId];
              const tasks = column.taskIds.map(
                (taskIds) => board.tasks[taskIds]
              );
              return (
                <div className=" ml-[50px] md:ml-[200px] lg:ml-[100px]">
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                    board={board}
                    setBoard={setBoard}
                  />
                </div>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
export default Board;
