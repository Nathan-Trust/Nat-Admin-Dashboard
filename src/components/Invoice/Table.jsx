import React from "react";

export default function Table({ list, setList, total, bankAccount, bankName }) {
  return (
    <>
      <table style={{ width: "100%" }} className="my-6 ">
        <thead className="">
          <tr>
            <td className="font-bold text-slate-500 text-[8px] uppercase">
              Item description
            </td>
            <td className="font-bold text-slate-500  text-[10px] uppercase">
              Quantity
            </td>
            <td className="font-bold text-slate-500 text-[10px] uppercase">
              Price
            </td>
            <td className="font-bold text-slate-500 text-[10px] uppercase">
              Amount
            </td>
          </tr>
        </thead>
        {list.map(({ id, description, quantity, price, amount }) => (
          <React.Fragment key={id} className="flex ">
            <tbody>
              <tr>
                <td className="text-[10px] font-extrabold">{description}</td>
                <td className="text-[10px] font-semibold">{quantity}</td>
                <td className="text-[10px] font-semibold">${price}</td>
                <td className="text-[10px] font-semibold">{amount}USD</td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}
      </table>
      <div className="flex  flex-col print-total">
        <div
          className="w-[250px] border-gray-950 "
          style={{ border: "1px solid" }}
        >
          <div className="flex justify-between items-center ">
            <h3 className="text-[10px] font-semibold">TOTAL</h3>
            <h2 className="text-[10px] ">{total.toLocaleString()}USD</h2>
          </div>
        </div>
      </div>

      <p className="text-[9px]  mt-2 print-note">
        to the business account below. Please include invoice number on your
        check
      </p>
      <div className="flex  gap-3 mt-1 mb-2 print-bank ">
        <p className="text-[10px]">
          <span className="text-gray-500">BANK:</span>
          {bankName}{" "}
        </p>
        <p className="text-[10px]">
          <span className="text-gray-500">IBAN:</span>
          {bankAccount}{" "}
        </p>
      </div>
    </>
  );
}
