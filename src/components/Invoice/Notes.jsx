import React from 'react'

export default function Notes({note}) {
  return (
    <>
      <section className="">
        <h2>NOTES</h2>
        <p className="text-[10px]  dark:text-white]">{note}</p>
        <p className="text-[10px] my-2 dark:text-white">
          Thank you for your confidence in my work
        </p>
      </section>
    </>
  );
}
