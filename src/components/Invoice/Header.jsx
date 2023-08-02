import React from "react";

export default function Header({ handlePrint }) {
  return (
    <>
      <header className="">
          <h2 className="font-semibold text-xl">
            Preview
          </h2>

        {/* <div>
          <ul className="flex items-center justify-between flex-wrap">
            <li>
              <button
                type="button"
                className="py-2 px-8 mt-5  rounded shadow border-2 border-blue-500 hover:bg-transparent text-white font-bold transition-all duration-300 invoiceButton"
                onClick={handlePrint}
              >
                Print
              </button>
            </li>
            <li className="mx-2">
              <button className="py-2 px-8 mt-5  rounded shadow border-2 border-blue-500 hover:bg-transparent text-white font-bold transition-all duration-300 invoiceButton">
                Download
              </button>
            </li>
            <li>
              <button className="py-2 px-8 mt-5  rounded shadow border-2 border-blue-500 hover:bg-transparent text-white font-bold transition-all duration-300 invoiceButton">
                Send
              </button>
            </li>
          </ul>
        </div> */}
      </header>
    </>
  );
}
