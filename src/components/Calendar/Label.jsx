import React from 'react'
import { useStateContext } from "../../contexts/ContextProvider";

export default function Label() {
    const {labels , setLabels , updateLabels} = useStateContext()
  return (
      <div>{labels.map(({ label: lbl, checked }, idx) => (
          <label key={idx} className="items-center mt-3 block">
              <input type="checkbox" checked={checked} onChange={() => updateLabels({label:lbl , checked: !checked})} className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring -0 cursor-pointer `} />
              <span className="ml-2 text-gray-700 capitalize">{ lbl}</span>
        </label>
    ))}</div>
  )
}
