import React from "react";

export default function MainDetails({ name, address, email, phone}) {
  return (
    <>
      <section className="flex justify-between ">
        <div>
          <h1 className="text-3xl font-bold">Cravens</h1>
        </div>

        <div>
          <p className="font-bold text-[10px]">
            <span>@</span>
            {email}
          </p>
          <p className="font-bold text-[10px]">
            <span>m</span>
            {phone}
          </p>
        </div>
      </section>
    </>
  );
}
