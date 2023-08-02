import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { MdCancel } from "react-icons/md";
import image from "./avatar.jpg";
import image2 from "./avatar2.jpg";
import image3 from "./avatar3.png";
import image4 from "./avatar4.jpg";
// import img from "5203299.jpg"

const Container = styled.div`
  border-radius: 5px;
  margin-bottom: 8px;
  padding:8px;
`;

const Task = (props) => {
  // console.log(props);
  const { task } = props;
  //   console.log(props);

  const deleteTask = (columnId, index, taskId) => {
    const column = props.board.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(index, 1);

    const tasks = props.board.tasks;
    const { [taskId]: oldTask, ...newTasks } = tasks;

    props.setBoard({
      ...props.board,
      tasks: {
        ...newTasks,
      },
      columns: {
        ...props.board.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });
  };
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="dark:bg-nat bg-white dark:text-white "
        >
          {props.task.content}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center ">
              <div
                className="flex "
                style={{
                  position: "relative",
                  width: "40px",
                }}
              >
                <img
                  src={image}
                  alt="clip"
                  style={{ width: "15px", height: "15px", borderRadius: "50%" }}
                />
                <img
                  src={image2}
                  alt="clip"
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "7px",
                  }}
                />
                <img
                  src={image3}
                  alt="clip"
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "14px",
                  }}
                />
                <img
                  src={image4}
                  alt="clip"
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "21px",
                  }}
                />
                {/* <div
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "28px",
                    backgroundColor: "gray",
                  }}
                  className="flex items-center justify-center text-white font-semibold"
                >
                  +8
                </div> */}
              </div>
            </div>

            <span
              className="cursor-pointer"
              onClick={() =>
                deleteTask(props.columnId, props.index, props.task.id)
              }
            >
              <MdCancel className=" text-red-400" />
            </span>
          </div>
          <div>{/* <img src="" alt="" /> */}</div>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
