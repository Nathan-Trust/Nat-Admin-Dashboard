import React from 'react'

export default function Dates({invoiceNumber , invoiceDate , dueDate}) {
  return (
    <>
      <article className="">
        <div>
          <p className="flex flex-col text-[9px] text-gray-600 dark:text-slate-900">
            <span className="font-bold text-[12px] text-slate-900 dark:text-white">
              Invoice no:
            </span>{" "}
            {invoiceNumber}
          </p>
        </div>
        <div>
          <p className="flex flex-col text-[9px] text-gray-600 dark:text-slate-900">
            <span className="font-bold text-[12px] text-slate-900 dark:text-white">
              Invoice date:
            </span>{" "}
            {invoiceDate}
          </p>
        </div>
        <div>
          <p className="flex flex-col text-[9px] text-gray-600 dark:text-slate-900">
            <span className="font-bold text-[12px] text-slate-900 dark:text-white">
              Due date:
            </span>{" "}
            {dueDate}
          </p>
        </div>
      </article>
    </>
  );
}
