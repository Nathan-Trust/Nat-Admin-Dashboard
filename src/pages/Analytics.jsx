import React, { useEffect, useState, useContext } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import SideBar from "../components/global/SideBar";
import ThemeSettings from "../components/ThemeSettings";
import { MdCall, MdLocationPin, MdMail, MdSettings } from "react-icons/md";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import useFetch from "../useFetch";
import { AuthContext } from "../contexts/AuthContext";
import Header from "../components/Header";
import { AddCustomer, AddCustomerOnMedium } from "../components/AddCustomer";
import Table from "../components/Table";
import useMediaQuery from "@mui/material/useMediaQuery";
import TableMin from "../components/TableMin";
import BarChart from "../components/BarChart"
import {UserData} from "../data/UserTableData"

const Analytics = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    setAddCustomer,
    addCustomer,
    side,
    setSide,
    currentMode,
  } = useStateContext();
  const { currentUser } = useContext(AuthContext);
  const [tableData, setTableData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [err, setErr] = useState("");
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: currentColor,
        borderRadius: 3,
        barThickness: 20,
        barPercentage: 0.8, // Adjust the width of the bars (default is 0.9)
        categoryPercentage: 0.7, // Adjust the spacing between bars (default is 0.8)
      },
    ],
  });
  // const onNonMobile = useMediaQuery("(max-width:992px)");
  // const breakPoint = useMediaQuery("(max-width:674px)");

  /* const lightSx = () => {
9
    "& .MuiDataGrid-root": {
      border: "none",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#7352FF",
      borderBottom: "none",
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
      backgroundColor: '#7352FF',
    },
    "& .MuiCheckbox-root": {
      color: currentColor,
    }
} */
  /* useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setTableData(data));
  }, []); */

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/customers")
        .then((res) => {
          if (!res.ok) {
            throw Error("Sorry, couldn't fetch data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setTableData(data);
          setIsPending(false);
          setErr(null);
        });
    }, 1000);
  }, []);

  const handlePost = () => {
    setAddCustomer(true);
    setSide(false);
  };
  /* const {
    data:customer,
    isPending,
    error,
  } = useFetch("http://localhost:8000/customers"); */

  /* console.log(tableData);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      renderCell: ({ row: { gender } }) => {
        return (
          <div className="flex w-24 justify-center ">
            {gender === "Male" ? (
              <div className="py-1 px-3 bg-blue-500 rounded-full text-blue-300">
                Male
              </div>
            ) : (
              <div className="py-1 px-3 bg-pink-500 rounded-full text-red-300">
                Female
              </div>
            )}
          </div>
        );
      },
    },
  ];
 */
  return (
    <>
      <div className="flex relative bg-light-mode dark:bg-secondary-dark-bg">
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

        <div className="dark:bg-nat ">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg  bg-white ">
              <SideBar />
            </div>
          ) : (
            <div className=" w-0 mt-7 h-680 dark:bg-secondary-dark-bg  rounded-lg bg-white">
              <SideBar />
            </div>
          )}
        </div>
        <div
          className={
            activeMenu
              ? " min-h-screen md:ml-72 w-full bg-light-mode "
              : " w-full min-h-screen flex-2 bg-light-mode"
          }
        >
          <div>
            {themeSettings && <ThemeSettings />}
            <div className=" block md:hidden">
              {addCustomer && <AddCustomerOnMedium />}
            </div>
            <div>
              <div className="flex justify-between  ">
                <div className="dark:bg-nat h-screen w-full items-center bg-light-mode flex flex-col">
                  <div style={{ width: "90%" }} className="py-4 ">
                    <div className="flex justify-between items-center ">
                      <div>
                        <Header title="Analytics" />
                        {isPending && <div>Loading...</div>}
                      </div>
                      <div>
                        <button
                          className="bg-blue-600 py-2 px-4 lg:text-xl text-xs text-white rounded-md"
                          onClick={handlePost}
                          style={{ background: currentColor }}
                        >
                          +Add Customer
                        </button>
                      </div>
                    </div>

                    <div
                      className="mt-5"
                      style={{
                        height: "500px",
                        overflowY: "scroll",
                        width: "100%",
                      }}
                    >
                      {window.innerWidth <= 900 ? (
                        <div style={{}}>
                          {" "}
                          <TableMin data={tableData} />
                        </div>
                      ) : (
                        <Table data={tableData} />
                      )}
                    </div>
                  </div>
                </div>
                {side && (
                  <div className="h-screen p-4 px-2 bg-white hidden lg:block dark:bg-secondary-dark-bg dark:text-white ">
                    <div className="flex flex-col items-center">
                      <img
                        src={currentUser.photoURL}
                        alt="a guy"
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                        className="mb-5"
                      />
                      <p>{currentUser.displayName}</p>
                      <p>Frontend Developer</p>
                      <div
                        className="mt-6"
                        style={{
                          border: "none",
                          borderBottom: "1px solid black",
                          width: "300px",
                        }}
                      />
                    </div>

                    <p>Contact Info</p>
                    <div>
                      <p className="flex items-center gap-1">
                        <span className="text-xl text-slate-400">
                          <MdMail />
                        </span>
                        {currentUser.email}
                      </p>
                      <div
                        className="mt-6"
                        style={{
                          border: "none",
                          borderBottom: "1px solid black",
                          width: "300px",
                        }}
                      />
                      <p className="flex items-center gap-1">
                        <span className="text-xl text-slate-400">
                          <MdCall />
                        </span>
                        +234 807 7567
                      </p>
                      <div
                        className="mt-6"
                        style={{
                          border: "none",
                          borderBottom: "1px solid black",
                          width: "300px",
                        }}
                      />
                      <p className="flex items-center gap-1">
                        <span className="text-xl text-slate-400">
                          <MdLocationPin />
                        </span>
                        2239 Hog Camp Road Schaumberg
                      </p>
                      <div
                        className="mt-6"
                        style={{
                          border: "none",
                          borderBottom: "1px solid black",
                          width: "300px",
                        }}
                      />
                    </div>
                    <BarChart chartData={userData}  />
                  </div>
                )}
                {addCustomer && (
                  <div className=" h-screen bg-white dark:bg-secondary-dark-bg hidden lg:block dark:text-white">
                    <AddCustomer />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;


// eslint-disable-next-line

{
  /* <Box
  sx={{
    height: "80vh",
    "& .MuiDataGrid-root": {
      border: "none",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#7352FF",
      borderBottom: "none",
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
      backgroundColor: "#7352FF",
    },
    "& .MuiCheckbox-root": {
      color: currentColor,
    },
  }}
>
  <DataGrid
    checkboxSelection
    rows={tableData}
    className="dark:text-white"
    id="style-14"
    style={{ border: "none" }}
    columns={
      breakPoint
        ? [
            {
              field: "name",
              headerName: "Name",
              flex: 1,
              cellClassName: "name-column--cell",
            },
          ]
        : onNonMobile
        ? [
            {
              field: "name",
              headerName: "Name",
              flex: 1,
              cellClassName: "name-column--cell",
            },
            {
              field: "email",
              headerName: "Email",
              flex: 1,
            },
          ]
        : columns
    }
    pageSize={12}
    slots={{
      toolbar: GridToolbar,
    }}
  />
</Box>; */
}
