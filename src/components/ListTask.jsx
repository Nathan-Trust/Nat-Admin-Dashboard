// import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import  toast from "react-hot-toast";
import {AiOutlineDelete} from "react-icons/ai"
import { useStateContext } from "../contexts/ContextProvider";
import { useDrag, useDrop } from "react-dnd";

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
   
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop:(item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));


  let bg = "bg-slate-500";
  let text = " Todo";
  let tasksToMap = todos

  if (status === "inprogress") {
    text = "In Progress"
    bg = "bg-purple-500"
    tasksToMap = inProgress
  }
  if (status === "closed") {
    text = "Closed"
    bg = "bg-green-500"
    tasksToMap = closed
  }


  const addItemToSection = (id) => {
    setTasks(prev => {
      const modifiedTask = prev.map(t => {
        if (t.id === id) {
      return{...t,status:status}
        }
        return t 
      })
      localStorage.setItem("tasks", JSON.stringify(modifiedTask));
      toast("Task status changed" , {icon: "😮"})
      return modifiedTask;
})
  }

  return (
    <div ref={drop} className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200":"" }`}>
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 && tasksToMap.map(task => <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)}
    </div>
  );
};
 const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
    >
      {text}{" "}
      <div className="ml-2 bg-white w-5 h-5 rounded-full flex items-center justify-center  text-black">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item:{id: task.id},
    collect: (monitor) => ({
      isDragging:!!monitor.isDragging()
    }),
  }));

  console.log(isDragging);
  const handleRemove = (id) => {
    const fTasks = tasks.filter(task => task.id !== id)
    localStorage.setItem("tasks" , JSON.stringify(fTasks))
    setTasks(fTasks)
    toast("Task removed",{icon : "💀"})
  }
  return (
    <div ref={drag} className={`relative p-4 mt-8 dark:bg-secondary-dark-bg shadow-md rounded-md cursor-grab dark:text-white ${isDragging ? "opacity-25" : "opacity-100"}`}>
      <p>{task.name}</p> 
      <button className="absolute bottom-1 right-1 text-red-400" onClick={() => handleRemove(task.id)}><AiOutlineDelete/></button>
     </div>
   )
}

const ListTask = () => {
  const {tasks , setTasks} = useStateContext()
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);



  // console.log(tasks.filter((task) => task.status === "todo"));
  useEffect(() => {
    if (tasks !== null) {
      const fTodos = tasks.filter((task) => task.status === "todo");
      const fInProgress = tasks.filter((task) => task.status === "inprogress");
      const fClosed = tasks.filter((task) => task.status === "closed");

      setTodos(fTodos);
      setInProgress(fInProgress);
      setClosed(fClosed);
    }
  }, [tasks]);

 /*  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fClosed = tasks.filter((task) => task.status === "closed");
 
    setTodos(fTodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
  }, [tasks]); */

  const statuses = ["todo", "inprogress", "closed"];
  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
};

export default ListTask;
