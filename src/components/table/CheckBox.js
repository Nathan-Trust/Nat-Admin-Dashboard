import React from "react";
import { useEffect, useRef, forwardRef } from "react";

const CheckBox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);
    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
});

export default CheckBox;
