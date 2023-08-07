import { list } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { useStateContext } from "../../contexts/ContextProvider";

export default function TableForm({
  description,
  setDescription,
  quantity,
  setQuantity,
  price,
  setPrice,
  amount,
  setAmount,
  list,
  setList,
  total,
  setTotal
}) {
  const [isEditing, setIsEditing] = useState(false);
  const {currentColor} = useStateContext()

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItems = {
      id: uuidv4(),
      description,
      quantity,
      price,
      amount,
    };

    setDescription("");
    setQuantity(" ");
    setPrice("");
    setAmount("");
    setList([...list, newItems]);
    setIsEditing(false);
  };

  useEffect(() => {
    const calculateAmount = (amount) => {
      setAmount(quantity * price);
    };
    calculateAmount(amount);
  }, [amount, price, quantity, setAmount]);

  //Calculate total amount
useEffect(() => {
  let rows = document.querySelectorAll(".amount");
  let sum = 0;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].className === "amount") {
      sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML);
      setTotal(sum);
    }
  }
})

  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    setDescription(editingRow.description);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
  };

  const deleteRow = (id) => setList(list.filter((row) => row.id !== id));
  return (
    <>
      <form onSubmit={handleSubmit} className="dark:text-white">
        <div className="flex flex-col md:mt-1 dark:text-white">
          <label htmlFor="description" className="font-semibold text-sm">
            Item Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Item Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
          />
        </div>

        <div className="md:grid grid-cols-3 gap-10 md:mt-6">
          <div className="flex flex-col">
            <label htmlFor="quantity" className="font-semibold text-sm ml-1">
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md mt-1"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="font-semibold text-sm ml-1">
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="amount" className="font-semibold text-sm">
              Amount
            </label>
            <p>{amount}</p>
          </div>
        </div>
        <button
          type="submit"
          className="py-2 px-3 my-5 rounded-md shadow border-2 text-sm itemSubmit  text-white font-bold transition-all duration-300"
          style={{
            backgroundColor: currentColor,
            border: `1px solid ${currentColor}`,
          }}
        >
          {isEditing ? "Editing Row Item" : "Add Table Items"}
        </button>
      </form>

      <table style={{ width: "100%" }} className="my-2">
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
          <React.Fragment key={id} className="flex">
            <tbody className="dark:text-white">
              <tr>
                <td className="text-[10px] font-extrabold">{description}</td>
                <td className="text-[10px] font-semibold">{quantity}</td>
                <td className="text-[10px] font-semibold">${price}</td>
                <td className="amount" style={{ fontSize: "10px" }}>
                  {amount}
                </td>
                <td>
                  <button
                    className="text-red-500  text-[15px]"
                    onClick={() => deleteRow(id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
                <td>
                  <button
                    className="text-green-500  text-[15px]"
                    onClick={() => editRow(id)}
                  >
                    <AiOutlineEdit />
                  </button>
                </td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}
      </table>
      <div
        className="flex  my-3  mx-6 print-total justify-end dark:text-white"
        // style={{ border: "1px solid" }}
      >
        <div
          className="w-[170px] border-gray-950 "
          // style={{ border: "1px solid" }}
        >
          <div className="flex justify-between items-center ">
            <h3 className="text-[10px] font-semibold">TOTAL</h3>
            <h2 className="text-[15px] font-semibold ">
              {total.toLocaleString()}USD
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
