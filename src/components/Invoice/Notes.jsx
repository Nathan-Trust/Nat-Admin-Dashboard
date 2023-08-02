import React from 'react'

export default function Notes({note}) {
  return (
    <>
      <section className="">
        <h2>NOTES</h2>
        <p className="text-[12px]">{note}</p>
        <p className="text-[12px] my-3">Thank you for your confidence in my work</p>
      </section>
    </>
  );
}
