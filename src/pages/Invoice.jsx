import React, { useState, useRef, useContext, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import SideBar from "../components/global/SideBar";
import ThemeSettings from "../components/ThemeSettings";
import { MdSettings } from "react-icons/md";
// import Header from "../components/Header";
import { BackwardOutlined, CameraOutlined } from "@ant-design/icons";
import Footer from "../components/Invoice/Footer";
import Notes from "../components/Invoice/Notes";
import Table from "../components/Invoice/Table";
import Header from "../components/Invoice/Header";
import MainDetails from "../components/Invoice/MainDetails";
import ClientDetails from "../components/Invoice/ClientDetails";
import Dates from "../components/Invoice/Dates";
import TableForm from "../components/Invoice/TableForm";
import ReactToPrint from "react-to-print";
import { FiPrinter } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import animeInvoice1 from "../data/animeInvoice (1).jpg";
import Typewriter from "typewriter-effect";
import { MdOutlineCancel } from "react-icons/md";
import { BsArrowLeftCircle } from "react-icons/bs";

const Invoice = () => {
  const { activeMenu, themeSettings, setThemeSettings, currentColor } =
    useStateContext();
  const { currentUser } = useContext(AuthContext);
  const [showInvoice, setShowInvoice] = useState(true);
  const [name, setName] = useState("Nathan-Trust");
  const [address, setAddress] = useState("Uyo, Akwa Ibom State");
  const [email, setEmail] = useState("prym@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("+234 810 807 7567");
  const [bankName, setBankName] = useState("Zenith Bank");
  const [bankAccount, setBankAccount] = useState("4564812356");
  const [website, setWebsite] = useState("https://nathan.com");
  const [clientName, setClientName] = useState("Wha kee");
  const [clientAddress, setClientAddress] = useState("Lagos , Nigeria");
  const [invoiceNumber, setInvoiceNumber] = useState("456123789");
  const [invoiceDate, setInvoiceDate] = useState("2023-09-08");
  const [dueDate, setDueDate] = useState("2024-09-08");
  const [note, setNote] = useState(
    "All amounts are in dollars. Please make the payment within 15 days from the issue of date of this invoice. Tax is not charged on the basis of paragraph 1 of Article 94 of the Value Added Tax Act(I am not liable for VAT)"
  );
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemDescription, setItemDescription] = useState(false);
  const [createInvoice, setCreateInvoice] = useState(false);
  const [clientDetails, setClientDetails] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(false);
  const [tableDetails, setTableDetails] = useState(false);
  const [preview, setPreview] = useState(false);

  const componentRef = useRef();

  /* const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger animation once
    threshold: 0.2, // The percentage of the element that needs to be in view to trigger the animation
  }); */

  const handlePrint = () => {
    window.print();
  };

  const nextStep = () => {
    setCreateInvoice(false);
    setClientDetails(true);
  };

  const intermediaryStep = () => {
    setClientDetails(false);
    setInvoiceDetails(true);
  };
  const thirdStep = () => {
    setInvoiceDetails(false);
    setTableDetails(true);
  };


  const previewStep = () => {
    setPreview(false)
    setTableDetails(true)
  }

  const setCreateInvoiceFalse = () => {
    setCreateInvoice(false);
    setClientDetails(false);
    setInvoiceDetails(false);
    setTableDetails(false);
  };

  const sideDetails = () => {
    setCreateInvoice(false);
    setClientDetails(false);
    setInvoiceDetails(false);
    setTableDetails(false);
    setPreview(true);
  };

  return (
    <>
      <div className="flex relative  bg-light-mode dark:bg-secondary-dark-bg ">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <button
            type="button"
            style={{ backgroundColor: currentColor, borderRadius: "50%" }}
            className="text-2xl p-3 hover:drop-shadow-xl text-white"
            onClick={() => setThemeSettings(true)}
          >
            <MdSettings />
          </button>
        </div>

        <div className="dark:bg-nat" style={{ height: "100vh" }}>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <SideBar />
            </div>
          ) : (
            <div className=" w-0 hidden  mt-7 h-680 dark:bg-secondary-dark-bg rounded-lg bg-white">
              <SideBar />
            </div>
          )}
        </div>

        <div
          className={
            activeMenu
              ? " min-h-screen md:ml-72 w-full dark:bg-nat bg-slate-gray "
              : " w-full min-h-screen flex-2 dark:bg-nat bg-slate-gray "
          }
        >
          <div>
            {themeSettings && <ThemeSettings />}
            <div className="">
              <div>
                <Navbar />
              </div>

              {/* Aniamted text and create invoice button */}
              {preview ? (
                <div className="w-full flex items-center justify-center">
                  <div
                    ref={componentRef}
                    className="w-[350px] bg-white p-3 rounded-md dark:bg-secondary-dark-bg print-show"
                  >
                    <div className="flex justify-between items-center">
                      <Header handlePrint={handlePrint} />
                      <div>
                        <button
                          type="button"
                          className="text-slate-500 mx-3"
                          onClick={previewStep}
                        >
                          <BsArrowLeftCircle />
                        </button>
                        <ReactToPrint
                          trigger={() => (
                            <button>
                              <FiPrinter />
                            </button>
                          )}
                          content={() => componentRef.current}
                        />
                      </div>
                    </div>

                    <div className="bg-light-mode p-3 py-3 rounded-md dark:bg-nat dark:text-white">
                      <MainDetails
                        name={name}
                        address={address}
                        email={email}
                        phone={phoneNumber}
                      />
                      <div className="flex mt-4 items-center justify-between">
                        <ClientDetails
                          clientName={clientName}
                          clientAddress={clientAddress}
                        />
                        <div className=" text-end">
                          <h1 className="text-2xl font-semibold">Invoice</h1>
                          <Dates
                            invoiceNumber={invoiceNumber}
                            invoiceDate={invoiceDate}
                            dueDate={dueDate}
                          />
                        </div>
                      </div>
                    </div>
                    <Table
                      description={description}
                      quantity={quantity}
                      price={price}
                      amount={amount}
                      list={list}
                      setList={setList}
                      total={total}
                      setTotal={setTotal}
                      bankAccount={bankAccount}
                      bankName={bankName}
                    />
                    <Notes note={note} />
                    <Footer
                      name={name}
                      address={address}
                      website={website}
                      email={email}
                      phone={phoneNumber}
                      bankAccount={bankAccount}
                      bankName={bankName}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex mt-[80px] lg:mt-0 lg:justify-between items-center md:mt-0">
                  <div className="ml-4 flex flex-col md:mb-20 items-center md:items-start w-full  lg:block">
                    <div
                      className="text-xl lg:text-[30px] ml-3 dark:text-white "
                      style={{ alignSelf: "start" }}
                    >
                      <Typewriter
                        options={{
                          autoStart: true,
                          loop: true,
                          delay: 40,
                          strings: [
                            "Hi there !",
                            "Let's create an invoice",
                            "To generate an invoice",
                            "Click on create invoice",
                            "Fill in your details",
                            "Fill in client's details",
                            "Add items ,quantity and price ",
                            "Checks and balances",
                            "Invoice created",
                            "Preview invoice",
                            "Print invoice",
                            "Hurray 🎉🎉🎊🎊",
                          ],
                        }}
                      />
                    </div>

                    <div className="m-0 lg:m-3 mt-6 flex flex-col gap-3 md:hidden w-[250px]">
                      <div className="dark:bg-secondary-dark-bg bg-light-mode dark:text-white p-4 w-full rounded-md">
                        Improve sales
                      </div>
                      <div className="dark:bg-secondary-dark-bg bg-light-mode dark:text-white p-4  w-full rounded-md">
                        Remarkable achievements
                      </div>
                      <div className="dark:bg-secondary-dark-bg bg-light-mode dark:text-white p-4  w-full rounded-md">
                        Accurate
                      </div>
                      <div className="dark:bg-secondary-dark-bg bg-light-mode dark:text-white p-4  w-full rounded-md">
                        Precise
                      </div>
                    </div>

                    <button
                      className="p-2 rounded-md m-0 lg:m-3 mt-6 lg:mt-10 px-10 text-white"
                      style={{ backgroundColor: currentColor }}
                      onClick={() => setCreateInvoice(true)}
                    >
                      Create Invoice
                    </button>
                  </div>
                  {createInvoice ? (
                    <div
                      className="createInvoice md:mr-16 md:static fixed top-0 right-0 h-screen w-screen md:w-full md:bg-none bg-[#1f1b3252] md:bg-transparent md:h-auto"
                      style={{ zIndex: 1000 }}
                    >
                      <div className="w-full flex items-center justify-center h-screen md:h-[550px] popUp ">
                        <div className="flex flex-col justify-center w-[300px] md:w-[350px] p-3 rounded-md  bg-white dark:bg-secondary-dark-bg">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="text-red-500"
                              onClick={setCreateInvoiceFalse}
                            >
                              <MdOutlineCancel />
                            </button>
                          </div>
                          <article className="dark:text-white">
                            <div className="flex flex-col ">
                              <label
                                htmlFor="name"
                                className="font-semibold text-sm"
                              >
                                Enter your name
                              </label>
                              <input
                                type="text"
                                name="text"
                                id="name"
                                placeholder="Enter your name"
                                autoComplete="off"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                              />
                            </div>

                            <div className="flex flex-col mt-2">
                              <label
                                htmlFor="address"
                                className="font-semibold text-sm"
                              >
                                Enter your address
                              </label>
                              <input
                                type="text"
                                name="address"
                                id="address"
                                placeholder="Enter your address"
                                autoComplete="off"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full bg-light-mode dark:bg-nat  text-sm p-2 rounded-md"
                              />
                            </div>
                          </article>

                          <article className="dark:text-white">
                            <div className="flex flex-col mt-2">
                              <label
                                htmlFor="email"
                                className="font-semibold text-sm"
                              >
                                Enter your email
                              </label>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                              />
                            </div>

                            <div className="flex flex-col dark:text-white mt-2">
                              <label
                                htmlFor="website"
                                className="font-semibold text-sm"
                              >
                                Enter your website
                              </label>
                              <input
                                type="url"
                                name="website"
                                id="website"
                                placeholder="Enter your website"
                                autoComplete="off"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                              />
                            </div>

                            <div className="dark:text-white mt-2">
                              <label
                                htmlFor="phoneNumber"
                                className="font-semibold text-sm"
                              >
                                Enter your phone number
                              </label>
                              <input
                                type="number"
                                name="phoneNumber"
                                id="phoneNumber"
                                placeholder="Enter your phone number"
                                autoComplete="off"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                              />
                            </div>
                          </article>

                          <article className="dark:text-white">
                            <div className="flex flex-col mt-2">
                              <label
                                htmlFor="bankAccount"
                                className="font-semibold text-sm"
                              >
                                Enter your bank account no.
                              </label>
                              <input
                                type="text"
                                name="bankAccount"
                                id="bankAccount"
                                placeholder="Enter your bank account number"
                                autoComplete="off"
                                value={bankAccount}
                                onChange={(e) => setBankAccount(e.target.value)}
                                className="w-full bg-light-mode dark:bg-nat dark:text-white text-sm p-2 rounded-md"
                              />
                            </div>
                          </article>

                          <button
                            type="button"
                            className="p-1 text-[15px] text-white rounded-md mt-4 nextBtn"
                            style={{ backgroundColor: currentColor }}
                            onClick={nextStep}
                          >
                            Next step
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : clientDetails ? (
                    <div
                      className="createInvoice md:mr-16 md:static fixed top-0 right-0 h-screen w-screen md:w-full md:bg-none bg-[#1f1b3252] md:bg-transparent md:h-auto"
                      style={{ zIndex: 1000 }}
                    >
                      <div className="w-full flex items-center justify-center h-screen md:h-[550px] popUp  ">
                        <div className="flex flex-col justify-center w-[300px] md:w-[350px] p-3 rounded-md  bg-white dark:bg-secondary-dark-bg md:mb-10">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="text-slate-500"
                              onClick={() => setCreateInvoice(true)}
                            >
                              <BsArrowLeftCircle />
                            </button>
                          </div>
                          <article className="dark:text-white">
                            <div className="flex flex-col">
                              <label
                                htmlFor="clientName"
                                className="font-semibold text-sm"
                              >
                                Enter your client's name
                              </label>
                              <input
                                type="text"
                                name="clientName"
                                id="clientName"
                                placeholder="Enter your client's name"
                                autoComplete="off"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                              />
                            </div>

                            <div className="flex flex-col mt-3">
                              <label
                                htmlFor="clientAddress"
                                className="font-semibold text-sm"
                              >
                                Enter your client's address
                              </label>
                              <input
                                type="text"
                                name="clientAddress"
                                id="clientAddress"
                                placeholder="Enter your client's address"
                                autoComplete="off"
                                value={clientAddress}
                                onChange={(e) =>
                                  setClientAddress(e.target.value)
                                }
                                className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                              />
                            </div>
                          </article>

                          <button
                            type="button"
                            className="p-1 text-[15px] text-white rounded-md mt-4 nextBtn"
                            style={{ backgroundColor: currentColor }}
                            onClick={intermediaryStep}
                          >
                            Next step
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : invoiceDetails ? (
                    <div
                      className="createInvoice md:mr-16 md:static fixed top-0 right-0 h-screen w-screen md:w-full md:bg-none bg-[#1f1b3252] md:bg-transparent md:h-auto"
                      style={{ zIndex: 1000 }}
                    >
                      <div className="w-full flex items-center justify-center h-screen md:h-[550px] popUp ">
                        <div className="flex flex-col justify-center w-[300px] md:w-[350px] p-3 rounded-md  bg-white dark:bg-secondary-dark-bg">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="text-slate-500"
                              onClick={() => setClientDetails(true)}
                            >
                              <BsArrowLeftCircle />
                            </button>
                          </div>
                          <div className="mb-3 dark:text-white">
                            <label
                              htmlFor="invoiceNumber"
                              className="font-semibold text-sm "
                            >
                              Enter your invoice number
                            </label>
                            <input
                              type="text"
                              name="invoiceNumber"
                              id="invoiceNumber"
                              placeholder="Enter your invoice number"
                              autoComplete="off"
                              value={invoiceNumber}
                              onChange={(e) => setInvoiceNumber(e.target.value)}
                              className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                            />
                          </div>

                          <div className="mb-3 dark:text-white">
                            <label
                              htmlFor="invoiceDate"
                              className="font-semibold text-sm "
                            >
                              Enter your invoice date
                            </label>
                            <input
                              type="date"
                              name="invoiceDate"
                              id="invoiceDate"
                              placeholder="Enter your invoice date"
                              autoComplete="off"
                              value={invoiceDate}
                              onChange={(e) => setInvoiceDate(e.target.value)}
                              className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                            />
                          </div>

                          <div className="mb-3 dark:text-white">
                            <label
                              htmlFor="dueDate"
                              className="font-semibold text-sm"
                            >
                              Due date
                            </label>
                            <input
                              type="date"
                              name="dueDate"
                              id="dueDate"
                              placeholder="Due date"
                              autoComplete="off"
                              value={dueDate}
                              onChange={(e) => setDueDate(e.target.value)}
                              className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                            />
                          </div>
                          <button
                            type="button"
                            className="p-1 text-[15px] text-white rounded-md mt-4 nextBtn"
                            style={{ backgroundColor: currentColor }}
                            onClick={thirdStep}
                          >
                            Next step
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : tableDetails ? (
                    <div
                      className="createInvoice md:mr-16 md:static fixed top-0 right-0 h-screen w-screen md:w-full md:bg-none bg-[#1f1b3252] md:bg-transparent md:h-auto"
                      style={{ zIndex: 1000 }}
                    >
                      <div className="w-full flex items-center justify-center h-screen md:h-[550px] popUp ">
                        <div className="flex flex-col justify-center w-[300px] md:w-[350px] p-3 rounded-md  bg-white dark:bg-secondary-dark-bg">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              className="text-slate-500"
                              onClick={() => setInvoiceDetails(true)}
                            >
                              <BsArrowLeftCircle />
                            </button>
                          </div>

                          <article className="">
                            <TableForm
                              description={description}
                              setDescription={setDescription}
                              quantity={quantity}
                              setQuantity={setQuantity}
                              price={price}
                              setPrice={setPrice}
                              amount={amount}
                              setAmount={setAmount}
                              list={list}
                              setList={setList}
                              total={total}
                              setTotal={setTotal}
                            />
                          </article>

                          <button
                            type="button"
                            className="p-1 text-[15px] text-white rounded-md mt-4 nextBtn"
                            style={{ backgroundColor: currentColor }}
                            onClick={sideDetails}
                          >
                            Preview Invoice
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="invoiceAnime hidden md:block dark:bg-secondary-dark-bg dark:text-gray-200 h-[500px] rounded-xl w-full lg:w-80 mr-16 p-8 pt-9 m-3 bg-no-repeat bg-cover bg-center" />
                  )}
                  <div></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;

{
  /* {itemDescription && (
              <article className="bg-test w-screen fixed top-0 flex justify-center items-center h-screen ">
                <div className="dark:text-gray-200  bg-white dark:bg-[#484B52] w-600 px-10">
                  <TableForm
                    description={description}
                    setDescription={setDescription}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    price={price}
                    setPrice={setPrice}
                    amount={amount}
                    setAmount={setAmount}
                    list={list}
                    setList={setList}
                    total={total}
                    setTotal={setTotal}
                  />
                </div>
              </article>
            )} */
}
{
  /* <div className=" h-screen w-full bg-light-mode dark:text-gray-200 dark:bg-nat px-4 py-4 ">
                <main className=" flex  gap-9">
                  <div className="flex flex-col justify-center w-[500px] p-3 rounded-md  bg-white dark:bg-secondary-dark-bg">
                    <article className="md:grid grid-cols-2 gap-10 mb-3">
                      <div className="flex flex-col ">
                        <label htmlFor="name" className="font-semibold text-sm">
                          Enter your name
                        </label>
                        <input
                          type="text"
                          name="text"
                          id="name"
                          placeholder="Enter your name"
                          autoComplete="off"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="address"
                          className="font-semibold text-sm"
                        >
                          Enter your address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Enter your address"
                          autoComplete="off"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-light-mode dark:bg-nat  text-sm p-2 rounded-md"
                        />
                      </div>
                    </article>

                    <article className="md:grid grid-cols-2 gap-10 mb-3">
                      <div className="flex flex-col">
                        <label
                          htmlFor="email"
                          className="font-semibold text-sm"
                        >
                          Enter your email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter your email"
                          autoComplete="off"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                        />
                      </div>

                      {/* <div className="flex flex-col">
                        <label
                          htmlFor="website"
                          className="font-semibold text-sm"
                        >
                          Enter your website
                        </label>
                        <input
                          type="url"
                          name="website"
                          id="website"
                          placeholder="Enter your website"
                          autoComplete="off"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="w-full bg-light-mode"
                        />
                      </div> 

                      <div className="">
                        <label
                          htmlFor="phoneNumber"
                          className="font-semibold text-sm"
                        >
                          Enter your phone number
                        </label>
                        <input
                          type="number"
                          name="phoneNumber"
                          id="phoneNumber"
                          placeholder="Enter your phone number"
                          autoComplete="off"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                        />
                      </div>
                    </article>

                    <article className="md:grid grid-cols-2 gap-10 mb-3">
                      <div className="flex flex-col">
                        <label
                          htmlFor="bankName"
                          className="font-semibold text-sm"
                        >
                          Enter your bank name
                        </label>
                        <input
                          type="text"
                          name="bankName"
                          id="bankName"
                          placeholder="Enter your phone number"
                          autoComplete="off"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="bankAccount"
                          className="font-semibold text-sm"
                        >
                          Enter your bank account no.
                        </label>
                        <input
                          type="text"
                          name="bankAccount"
                          id="bankAccount"
                          placeholder="Enter your bank account number"
                          autoComplete="off"
                          value={bankAccount}
                          onChange={(e) => setBankAccount(e.target.value)}
                          className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                        />
                      </div>
                    </article>

                    <article className="md:grid grid-cols-2 gap-10 mb-3">
                      <div className="flex flex-col">
                        <label
                          htmlFor="clientName"
                          className="font-semibold text-sm"
                        >
                          Enter your client's name
                        </label>
                        <input
                          type="text"
                          name="clientName"
                          id="clientName"
                          placeholder="Enter your client's name"
                          autoComplete="off"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="clientAddress"
                          className="font-semibold text-sm"
                        >
                          Enter your client's address
                        </label>
                        <input
                          type="text"
                          name="clientAddress"
                          id="clientAddress"
                          placeholder="Enter your client's address"
                          autoComplete="off"
                          value={clientAddress}
                          onChange={(e) => setClientAddress(e.target.value)}
                          className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                        />
                      </div>
                    </article>

                    <div className="mb-3">
                      <label
                        htmlFor="invoiceNumber"
                        className="font-semibold text-sm "
                      >
                        Enter your invoice number
                      </label>
                      <input
                        type="text"
                        name="invoiceNumber"
                        id="invoiceNumber"
                        placeholder="Enter your invoice number"
                        autoComplete="off"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="invoiceDate"
                        className="font-semibold text-sm "
                      >
                        Enter your invoice date
                      </label>
                      <input
                        type="date"
                        name="invoiceDate"
                        id="invoiceDate"
                        placeholder="Enter your invoice date"
                        autoComplete="off"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                        className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="dueDate"
                        className="font-semibold text-sm"
                      >
                        Due date
                      </label>
                      <input
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        placeholder="Due date"
                        autoComplete="off"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                      />
                    </div>

                    {/*  <article className="">
                        <TableForm
                          description={description}
                          setDescription={setDescription}
                          quantity={quantity}
                          setQuantity={setQuantity}
                          price={price}
                          setPrice={setPrice}
                          amount={amount}
                          setAmount={setAmount}
                          list={list}
                          setList={setList}
                          total={total}
                          setTotal={setTotal}
                        />
                    </article> 

                    <label htmlFor="note" className="font-semibold text-sm">
                      Additional Note
                    </label>
                    <textarea
                      name="notes"
                      id="notes"
                      cols="30"
                      rows="3"
                      placeholder="Additional Notes to the client"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full bg-light-mode dark:bg-nat text-sm p-2 rounded-md"
                    ></textarea>

                    {/* <button
                      className="py-2 px-8  rounded shadow border-2 border-blue-500 hover:bg-transparent text-white font-bold transition-all duration-300"
                      style={{ backgroundColor: currentColor }}
                      type="button"
                      onClick={(e) => setShowInvoice(true)}
                    >
                      {" "}
                      Preview Invoice
                    </button> 
                  </div>

                  
                    <div
                      ref={componentRef}
                      className="w-[500px] bg-white p-3 rounded-md dark:bg-secondary-dark-bg print-show"
                    >
                      <div className="flex justify-between items-center">
                        <Header handlePrint={handlePrint} />
                        <ReactToPrint
                          trigger={() => (
                            <button>
                              <FiPrinter />
                            </button>
                          )}
                          content={() => componentRef.current}
                        />
                      </div>

                      <div className="bg-light-mode p-3 py-4 rounded-md dark:bg-nat dark:text-white">
                        <MainDetails
                          name={name}
                          address={address}
                          email={email}
                          phone={phoneNumber}
                        />
                        <div className="flex mt-4 items-center justify-between">
                          <ClientDetails
                            clientName={clientName}
                            clientAddress={clientAddress}
                          />
                          <div className=" text-end">
                            <h1 className="text-2xl font-semibold">Invoice</h1>
                            <Dates
                              invoiceNumber={invoiceNumber}
                              invoiceDate={invoiceDate}
                              dueDate={dueDate}
                            />
                          </div>
                        </div>
                      </div>
                      <Table
                        description={description}
                        quantity={quantity}
                        price={price}
                        amount={amount}
                        list={list}
                        setList={setList}
                        total={total}
                        setTotal={setTotal}
                        bankAccount={bankAccount}
                        bankName={bankName}
                      />
                      <Notes note={note} />
                      <Footer
                        name={name}
                        address={address}
                        website={website}
                        email={email}
                        phone={phoneNumber}
                        bankAccount={bankAccount}
                        bankName={bankName}
                      />
                      {/* <button
                      className="py-2 px-8 mt-5  rounded shadow border-2 border-blue-500 hover:bg-transparent text-white font-bold transition-all duration-300"
                      style={{ backgroundColor: currentColor }}
                      type="button"
                      onClick={() => setShowInvoice(false)}
                    >
                      {" "}
                      Edit Information
                    </button> 
                    </div>
                </main>
                          </div> */
}
