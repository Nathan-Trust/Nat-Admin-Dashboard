import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  const [value, setValue] = useState(filterValue);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <span>
      Search:{""}
      <input
        value={value || " "}
        onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value)
        }}
      />
    </span>
  );
};

export default ColumnFilter;
