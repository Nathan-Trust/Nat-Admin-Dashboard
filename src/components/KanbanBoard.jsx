import React from "react";
import CreateTask from "./CreateTask";
import ListTask from "./ListTask";
import { useStateContext } from "../contexts/ContextProvider";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const KanbanBoard = () => {
  const { tasks, setTasks } = useStateContext();
  console.log(tasks)
  return (
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <div className="h-screen flex flex-col items-center p-3 gap-16">
          <CreateTask />
          <ListTask />
        </div>
      </DndProvider>
  );
};

export default KanbanBoard;
