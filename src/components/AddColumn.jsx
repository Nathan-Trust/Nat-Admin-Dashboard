import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useStateContext } from "../contexts/ContextProvider";
import image from "./avatar.jpg";
import image2 from "./avatar2.jpg";
import image3 from "./avatar3.png";
import image4 from "./avatar4.jpg";

const AddColumn = (props) => {
  const [showNewColumnButton, setShowNewColumnButton] = useState(true);
  const [value, setValue] = useState("");
  const { currentUser } = useContext(AuthContext);
  const {currentColor } = useStateContext()

  function handleInputComplete() {
    setShowNewColumnButton(true);
    addNewColumn(value);
    setValue("");
  }

  function addNewColumn(title) {
    const newColumnOrder = Array.from(props.board.columnOrder);
    const newColumnId = "column-" + Math.floor(Math.random() * 1000000);
    newColumnOrder.push(newColumnId);

    const newColumn = {
      id: newColumnId,
      title: title,
      taskIds: [],
    };

    props.setBoard({
      ...props.board,
      columns: {
        ...props.board.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: newColumnOrder,
    });
  }
  return (
    <div className="ml-3 ">
      <div className="flex justify-between items-center">
        <h2 className=" dark:text-white text-xl">
          Welcome {currentUser.displayName}
        </h2>
        <div className="flex items-center">
          <div
            className="flex mr-4 "
            style={{
              position: "relative",
              width: "130px",
            }}
          >
            <img
              src={image}
              alt="clip"
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
            <img
              src={image2}
              alt="clip"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                position: "absolute",
                left: "27px",
              }}
            />
            <img
              src={image3}
              alt="clip"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                position: "absolute",
                left: "52px",
              }}
            />
            <img
              src={image4}
              alt="clip"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                position: "absolute",
                left: "72px",
              }}
            />
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                position: "absolute",
                left: "92px",
                backgroundColor: "gray",
              }}
              className="flex items-center justify-center text-white font-semibold"
            >
              +8
            </div>
          </div>

          <button type="button" className="px-4 py-1 rounded-md text-white text-md hidden md:block mr-5" style={{backgroundColor:currentColor}}>
            +Share
          </button>
        </div>
      </div>
      {showNewColumnButton ? (
        <button
          className="dark:text-white button flex "
          onClick={() => setShowNewColumnButton(false)}
        >
          <span>{""}</span>
          Add new task
        </button>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleInputComplete}
        />
      )}
    </div>
  );
};

export default AddColumn;
