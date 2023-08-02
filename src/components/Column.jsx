import { styled } from "styled-components";
import Task from "./Task";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddTask from "./AddTask";
import { MdCancel } from "react-icons/md";

const Container = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const Title = styled.h3`
  padding: 5px;
  display: flex;
`;

const TaskList = styled.div`
  padding: 8px;
`;

const Column = (props) => {
  console.log(props.index);

  const deleteColumn = (columnId, index) => {
    const columnTasks = props.board.columns[columnId].taskIds;

    const finalTasks = columnTasks.reduce((previousValue, currentValue) => {
      const { [currentValue]: oldColumn, ...newTasks } = previousValue;
      return newTasks;
    }, props.board.tasks);

    const columns = props.board.columns;
    const { [columnId]: oldColumn, ...newColumns } = columns;

    const newColumnOrder = Array.from(props.board.columnOrder);
    newColumnOrder.splice(index, 1);

    props.setBoard({
      tasks: {
        ...finalTasks,
      },
      columns: {
        ...newColumns,
      },
      columnOrder: newColumnOrder,
    });
  };
  //   const { column} = props;
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="dark:bg-secondary-dark-bg flex-wrap bg-light-gray mt-3  md:mt-4 rounded-md overflow-hidden border-solid dark:border-[#2a2442] border-[#F7F7F7]"
        >
          <div className="flex items-center justify-between dark:bg-nat bg-white">
            <Title
              {...provided.dragHandleProps}
              className="dark:text-white text-xl font-semibold  "
            >
              {props.column.title}
            </Title>
            <div className="flex ">
              <AddTask
                columnId={props.column.id}
                board={props.board}
                setBoard={props.setBoard}
                className="hover:text-lg"
              />
              <MdCancel
                className=" text-red-400 cursor-pointer text-xl"
                onClick={() => deleteColumn(props.column.id, props.index)}
              />
            </div>
          </div>
          <Droppable droppableId={props.column.id} type="task">
            {(provided) => (
              <TaskList {...provided.droppableProps} ref={provided.innerRef}>
                {props.tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    columnId={props.column.id}
                    board={props.board}
                    setBoard={props.setBoard}
                  />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
