import React, { useState , useEffect } from "react";
import { dashCard } from "../data/dummy";
import Header from "../components/Header";
import { useStateContext } from "../contexts/ContextProvider";
import SideBar from "../components/global/SideBar";
import ThemeSettings from "../components/ThemeSettings";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { MdSettings } from "react-icons/md";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import { UserData } from "../data/UserTableData"; 
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { animateScroll as scroll } from "react-scroll";
// import { ScrollContainer, ScrollPage, Animator, ZoomIn , batch , FadeIn , Fade ,Zoom, MoveOut} from "react-scroll-motion";
// import Dropdown from "../components/Dropdown";
import { BsCurrencyDollar } from "react-icons/bs";
import img from "./28850184_office_05n.jpg";
// import Tooltip from "@mui/material/core/too"

const Dashboard = () => {
  const { activeMenu, themeSettings, setThemeSettings, currentColor } =
    useStateContext();
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
            <div className=" w-15 ml-5 mt-7 h-680 dark:bg-secondary-dark-bg rounded-lg bg-white">
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
          style={{ height: "100vh", overflowY: "auto" }}
        >
          <div>
            {themeSettings && <ThemeSettings />}
              <div className="">
                <div>
                  <Navbar />
                  <Header title="Dashboard" />
                </div>
                    <div className="flex flex-wrap lg:flex-nowrap justify-center " >
                      <div className=" dark:bg-secondary-dark-bg dark:text-gray-200 h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-no-repeat bg-cover bg-center dashBoard">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-bold text-gray-400">Earnings</p>
                            <p className="text-2xl">$63,448.78</p>
                          </div>
                          <button
                            type="button"
                            style={{ backgroundColor: currentColor }}
                            className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                          >
                            <BsCurrencyDollar />
                          </button>
                        </div>
                        <div className="mt-6">
                          {/* <Button
                      color="white"
                      bgColor={currentColor}
                      text="Download"
                      borderRadius="10px"
                    />  */}
                        </div>
                      </div>
                      <div className="flex m-3 flex-wrap justify-center gap-1 items-center sm:grid-cols-1">
                        {dashCard.map((card) => (
                          <div
                            key={card.title}
                            className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
                          >
                            <button
                              type="button"
                              style={{
                                color: card.iconColor,
                                backgroundColor: card.iconBg,
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                              className="text-2xl opacity-0.9 hover:drop-shadow-xl items-center justify-center flex"
                            >
                              {card.icon}
                            </button>
                            <p className="mt-3">
                              <span className="text-lg font-semibold">
                                {card.amount}
                              </span>
                              <span
                                className={`text-sm text-${card.pcColor} ml-2`}
                              >
                                {card.percentage}
                              </span>
                            </p>
                            <p className="text-sm text-gray-400  mt-1">
                              {card.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                <div className="flex gap-10 flex-wrap justify-center"  >
                  <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  " >
                    <div className="flex justify-between">
                      <p className="font-semibold text-xl">Revenue Updates</p>
                      <div className="flex items-center gap-4">
                        <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                          <span>
                            <GoPrimitiveDot />
                          </span>
                          <span>Expense</span>
                        </p>
                        <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                          <span>
                            <GoPrimitiveDot />
                          </span>
                          <span>Budget</span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-10 flex gap-10 flex-wrap justify-center">
                      <div className=" border-r-1 border-color m-4 pr-10">
                        <div>
                          <p>
                            <span className="text-3xl font-semibold">
                              $93,438
                            </span>
                            <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                              23%
                            </span>
                          </p>
                          <p className="text-gray-500 mt-1">Budget</p>
                        </div>
                        <div className="mt-8">
                          <p className="text-3xl font-semibold">$48,487</p>

                          <p className="text-gray-500 mt-1">Expense</p>
                        </div>

                        <div className="mt-5">
                          {/* <SparkLine
                            currentColor={currentColor}
                            id="line-sparkLine"
                            type="Line"
                            height="80px"
                            width="250px"
                            data={SparklineAreaData}
                            color={currentColor}
                          /> */}
                        </div>
                        <div className="mt-10">
                          <Button
                            color="white"
                            bgColor={currentColor}
                            text="Download Report"
                            borderRadius="10px"
                          />
                        </div>
                      </div>
                      <div>
                        {/* <Stacked
                          currentMode={currentMode}
                          width="320px"
                          height="360px"
                        /> */}
                        {/* <BarChart chartData={userData}   /> */}
                      </div>
                    </div>
                  </div>
                  <div >
                    <div
                      className=" rounded-2xl md:w-400 p-4 m-3"
                    style={{ backgroundColor: currentColor }}
                    
                    >
                      <div className="flex justify-between items-center " >
                        <p className="font-semibold text-white text-2xl">
                          Earnings
                        </p>

                        <div>
                          <p className="text-2xl text-white font-semibold mt-8">
                            $63,448.78
                          </p>
                          <p className="text-gray-200">Monthly revenue</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        {/* <SparkLine
                          currentColor={currentColor}
                          id="column-sparkLine"
                          height="100px"
                          type="Column"
                          data={SparklineAreaData}
                          width="320"
                          color="rgb(242, 252, 253)"
                        /> */}
                      </div>
                    </div>

                    <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
                      <div>
                        <p className="text-2xl font-semibold ">$43,246</p>
                        <p className="text-gray-400">Yearly sales</p>
                      </div>

                      <div className="w-40">
                        {/*  <Pie
                          id="pie-chart"
                          data={ecomPieChartData}
                          legendVisiblity={false}
                          height="160px"
                        /> */}
                        {/* <PieChart/> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

{
  /* <div className="flex relative ">
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

        <div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar  dark:bg-secondary-dark-bg  bg-white ">
              <SideBar />
            </div>
          ) : (
            <div className=" w-15 ml-5 mt-7 h-680  dark:bg-secondary-dark-bg  rounded-lg bg-white">
              <SideBar />
            </div>
          )}
        </div>

        <div
          className={
            activeMenu
              ? " min-h-screen md:ml-72 w-full bg-light-mode dark:bg-nat  "
              : " w-full min-h-screen flex-2 bg-light-mode dark:bg-nat"
          }
        >
          <div>
            {themeSettings && <ThemeSettings />}

            <div className="mt-12 ">
            <Header title="Dashboard"  />
              <div className="flex flex-wrap lg:flex-nowrap justify-center ">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern2 bg-no-repeat bg-cover bg-center">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-400">Earnings</p>
                      <p className="text-2xl">$63,448.78</p>
                    </div>
                    {/* <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button> 
                  </div>
                  <div className="mt-6">
                   <Button
                      color="white"
                      bgColor={currentColor}
                      text="Download"
                      borderRadius="10px"
                    /> 
                  </div>
                </div>
                <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                  {dashCard.map((card) => (
                    <div
                      key={card.title}
                      className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
                    >
                      <button
                        type="button"
                        style={{
                          color: card.iconColor,
                          backgroundColor: card.iconBg,
                        }}
                        className="text-2xl opacity-0.9 rounded-full p-5 hover:drop-shadow-xl"
                      >
                        {card.icon}
                      </button>
                      <p className="mt-3">
                        <span className="text-lg font-semibold">{card.amount}</span>
                        <span className={`text-sm text-${card.pcColor} ml-2`}>
                          {card.percentage}
                        </span>
                      </p>
                      <p className="text-sm text-gray-400  mt-1">
                        {card.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */
}

{
  /* <>
      <div className="flex relative bg-light-mode dark:bg-nat ">
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

        <div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg  bg-white ">
              <SideBar />
            </div>
          ) : (
            <div className=" w-15 ml-5 mt-7 h-680 dark:bg-secondary-dark-bg  rounded-lg bg-white">
              <SideBar />
            </div>
          )}
        </div>

        <div
          className={
            activeMenu
              ? " min-h-screen md:ml-72 w-full "
              : " w-full min-h-screen flex-2 "
          }
        >
          <div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">$63,448.78</p>
            </div>
            {/* <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button> 
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
            />
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div> 
            {themeSettings && <ThemeSettings />}
            <div className="m-7 ">
              <Header title="Dashboard" dropdown={<Dropdown />} />
              <div className="flex flex-wrap lg:flex-nowrap gap-3 items-center pl-1" style={{border:"1px solid black"}}>
              <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">$63,448.78</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
          <div className="mt-6">
            <button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
            />
          </div>
        </div>
                {dashCard.map((card) => (
                  <div className=" flex items-center gap-3 bg-white h-32 dark:text-gray-200  dark:bg-secondary-dark-bg   px-16  rounded-2xl">
                    <button
                      type="button"
                      style={{
                        color: card.iconColor,
                        backgroundColor: card.iconBg,
                      }}
                      className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
                    >
                      {card.icon}
                    </button>
                    <div>
                      <h3>{card.amount}</h3>
                      <p>{card.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ); */
}
