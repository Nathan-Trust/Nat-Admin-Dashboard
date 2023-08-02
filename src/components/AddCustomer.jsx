import { useState } from "react";
import { MdOutlineCancel, MdCamera } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import { TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

export const AddCustomer = () => {
  const {currentColor} = useStateContext()

  const { addCustomer, setAddCustomer, setSide } = useStateContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const handleSide = () => {
    setAddCustomer(false);
    setSide(true);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    address1: yup.string().required("required"),
    address2: yup.string().required("required"),
  });

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const handleSubmit = (e) => {
    const name = firstName + " " + lastName;
    e.preventDefault();
    const customer = { name, phone, email, gender };
    // setIsPending(true);
    fetch("http://localhost:8000/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    }).then(() => {
      console.log("New Customer Added");

      setSide(true);
      setAddCustomer(false);
      //   setIsPending(false);
    });
    // history.push("/");
  };
  return (
    <div>
      {addCustomer && (
        <div className="px-6">
          <div
            className="flex justify-between p-4 items-center "
            style={{ width: "280px" }}
          >
            <p className="text-xl font-semibold">Add customer</p>

            <button
              type="button"
              onClick={handleSide}
              style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
              className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
   <div className="flex items-center justify-center ">
        <div className="bg-red-300 p-9 rounded-full">
        <input type="file"  id="file" style={{display:"none"}} />
        <label htmlFor="file"><MdCamera/></label>
        </div>
    </div>


    <div className="flex flex-col gap-1" >
    <div className="flex flex-col">
        <label htmlFor="">First Name</label>
        <input type="text" placeholder="First Name" className="p-2 rounded-sm dark:bg-nat bg-light-mode" value={firstName}
          onChange={(e) => setFirstName(e.target.value)}/>
    </div>
    <div className="flex flex-col">
        <label htmlFor="">Last Name</label>
        <input type="text" placeholder="Last Name" className="p-2 rounded-sm dark:bg-nat bg-light-mode" value={lastName}
          onChange={(e) => setLastName(e.target.value)}/>
    </div>
    <div className="flex flex-col">
        <label htmlFor="">Email</label>
        <input type="text" placeholder="Email" className="p-2 rounded-sm dark:bg-nat bg-light-mode" value={email}
          onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div className="flex flex-col">
        <label htmlFor="">Phone Number</label>
        <input type="text" placeholder="Phone Number" className="p-2 rounded-sm dark:bg-nat bg-light-mode " value={phone}
          onChange={(e) => setPhone(e.target.value)}/>
    </div>
    <div className="flex flex-col">
        <label htmlFor="">Gender</label>
    <select className="p-2 rounded-sm dark:bg-nat bg-light-mode" value={gender}
          onChange={(e) => setGender(e.target.value)}>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    </select>
    </div>

<button type="submit" className="w-full flex items-center py-2 rounded-lg justify-center mt-11 text-white" style={{background:currentColor}}>Add Customer</button>

    </div>
   </form> 
          
        </div>
      )}
    </div>
  );
};




 export const AddCustomerOnMedium = () => {
    const { currentColor } = useStateContext();
  
    const { addCustomer, setAddCustomer, setSide } = useStateContext();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const handleSide = () => {
      setAddCustomer(false);
      setSide(true);
    };
  
    const initialValues = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
    };
  
    const phoneRegExp =
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  
    const checkoutSchema = yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      email: yup.string().email("invalid email").required("required"),
      contact: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
      address1: yup.string().required("required"),
      address2: yup.string().required("required"),
    });
  
    const handleFormSubmit = (values) => {
      console.log(values);
    };
  
    const handleSubmit = (e) => {
      const name = firstName + " " + lastName;
      e.preventDefault();
      const customer = { name, phone, email, gender };
      // setIsPending(true);
      fetch("http://localhost:8000/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      }).then(() => {
        console.log("New Customer Added");
  
        setSide(true);
        setAddCustomer(false);
        //   setIsPending(false);
      });
      // history.push("/");
   };
   
    return  (
      <div
        className="bg-test w-screen fixed nav-item top-0 right-0"
        style={{ zIndex: 2000 }}
      >
        <div className="float-right h-screen dark:text-gray-200 p-6 lg:pl-4 bg-white dark:bg-secondary-dark-bg w-720" style={{border:"1px solid black"}}>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg">Add a Customer</p>
            <button
              type="button"
              onClick={handleSide}
              style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
              className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <MdOutlineCancel />
            </button>
            
          </div>
          <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center ">
                <div className="bg-red-300 p-9 rounded-full">
                  <input type="file" id="file" style={{ display: "none" }} />
                  <label htmlFor="file">
                    <MdCamera />
                  </label>
                </div>
              </div>
  
              <div className="flex flex-col gap-1">
                <div className="flex flex-col">
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="p-2 rounded-sm dark:bg-nat bg-light-mode"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="p-2 rounded-sm dark:bg-nat bg-light-mode"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="p-2 rounded-sm dark:bg-nat bg-light-mode"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="p-2 rounded-sm dark:bg-nat bg-light-mode "
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Gender</label>
                  <select
                    className="p-2 rounded-sm dark:bg-nat bg-light-mode"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
  
                <button
                  type="submit"
                  className="w-full flex items-center py-2 rounded-lg justify-center mt-11 text-white"
                  style={{ background: currentColor }}
                >
                  Add Customer
                </button>
              </div>
            </form>
          
          
        </div>
      </div>
    );
}


{
  /* <form onSubmit={handleSubmit}>
   <div className="flex items-center justify-center ">
        <div className="bg-red-300 p-9 rounded-full">
        <input type="file"  id="file" style={{display:"none"}} />
        <label htmlFor="file"><MdCamera/></label>
        </div>
    </div>


    <div className="flex flex-col gap-1" >
    <div className="flex flex-col">
        <label htmlFor="">First Name</label>
        <input type="text" placeholder="First Name" className="p-2 rounded-sm dark:bg-nat bg-light-mode" value={firstName}
          onChange={(e) => setFirstName(e.target.value)}/>
    </div>
    <div className="flex flex-col">
        <label htmlFor="">Last Name</label>
        <input type="text" placeholder="Last Name" className="p-2 rounded-sm dark:bg-nat bg-light-mode" value={lastName}
          onChange={(e) => setLastName(e.target.value)}/>
    </div>
    <div className="flex flex-col">
        <label htmlFor="">Email</label>
        <input type="text" placeholder="Email" className="p-2 rounded-sm dark:bg-nat bg-light-mode" value={email}
          onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div className="flex flex-col">
        <label htmlFor="">Phone Number</label>
        <input type="text" placeholder="Phone Number" className="p-2 rounded-sm dark:bg-nat bg-light-mode " value={phone}
          onChange={(e) => setPhone(e.target.value)}/>
    </div>
    <div className="flex flex-col">
        <label htmlFor="">Gender</label>
    <select className="p-2 rounded-sm dark:bg-nat bg-light-mode" value={gender}
          onChange={(e) => setGender(e.target.value)}>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    </select>
    </div>

<button type="submit" className="w-full flex items-center py-2 rounded-lg bg-blue-600 justify-center mt-11 text-white ">Add Customer</button>

    </div>
   </form> */
}
