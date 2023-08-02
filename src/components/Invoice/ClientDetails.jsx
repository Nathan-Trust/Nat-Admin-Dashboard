import React from 'react'

export default function ClientDetails({clientName , clientAddress}) {
  return (
    <>
      <section className="">
        <h2 className="font-bold text-[10px] uppercase">Recipient</h2>
        <div className="mt-2 text-gray-600">
          <h3 className="text-sm uppercase ">{clientName}</h3>
          <p className="text-sm">
            {clientAddress}
          </p>
        </div>
      </section>
    </>
  );
}
