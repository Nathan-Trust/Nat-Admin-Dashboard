import { BsChevronBarLeft, BsChevronBarRight, BsList } from "react-icons/bs";
// import BasicTable from "./table/BasicTable";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
  useColumnOrder,
} from "react-table";
import { COLUMNS } from "./table/Columns";
import { useMemo } from "react";
// import MOCK_DATA from "./table/MOCK_DATA.json";
// import GlobalFilter from "./table/GlobalFilter";

import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import ColumnFilter from "./table/ColumnFilter";
import CheckBox from "./table/CheckBox";
import { useStateContext } from "../contexts/ContextProvider";

const Table = ({ data }) => {
  const { currentColor } = useStateContext();
  const columns = useMemo(() => COLUMNS, []);
  const rowData = useMemo(() => data, [data]);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const tableInstance = useTable(
    {
      columns,
      data: rowData,
      defaultColumn,
      initialState:{pageSize : 8}
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useColumnOrder,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          /*  {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <CheckBox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <CheckBox {...row.getToggleRowSelectedProps()} />
            ),
          }, */   
          ...columns,
        ];
      });
    }
  );
console.log(tableInstance)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    previousPage,
    nextPage,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    selectedFlatRows,
    setColumnOrder,
    allColumns,
    getToggleHideAllColumnsProps,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state
  // console.log(page)
  const changeOrder = () => {
    setColumnOrder(["id", "name", "gender" , "email"]);
  };
  return (
    <>
      {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
      <div>
        <div>
          {/* <div>
            <CheckBox {...getToggleHideAllColumnsProps()} /> Toggle All
          </div>
          {
            allColumns.map(column => (
              <div key={column.id}>
                <label>
                  <input type="checkbox" {...column.getToggleHiddenProps()} />
                  {column.Header}
                </label>
              </div>
            ))
          } */}
          <table
            className="min-w-full divide-y-2 divide-gray-200 text-sm analyticsTable"
            {...getTableProps()}
          >
            {/* <button onClick={changeOrder} type="button">
              Change Column Order
            </button> */}
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="whitespace-nowrap px-4 py-2 font-medium dark:text-white text-start "
                    >
                      {column.render("Header")}
                      {/* <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div> */}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowDownOutlined />
                          ) : (
                            <ArrowUpOutlined />
                          )
                        ) : (
                          " "
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="" {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="rounded-lg dark:bg-secondary-dark-bg mt-8 bg-white"
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="whitespace-nowrap px-4 py-2 font-medium dark:text-white "
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* <pre>
            <code>
              {JSON.stringify(
                {
                  selectedFlatRows: selectedFlatRows.map((row) => row.original),
                },
                null,
                2
              )}
            </code>
          </pre> */}
          <div className="flex justify-between">
            <span className="dark:text-white">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
              {""}
            </span>
            {/* <span>
            |Go to Page {""}
            <input
              type="number"
              value={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              className="w-20"
            />
          </span> */}
            <select
              className="dark:bg-secondary-dark-bg bg-white  dark:text-white rounded-md"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              style={{ border: "none" }}
            >
              {[5, 10, 15].map((pageSize) => (
                <option value={pageSize} key={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-start mt-3 gap-3 items-center">
            <button
              type="button"
              className=" text-white flex justify-center items-center cursor-pointer"
              style={{ background: currentColor, fontSize:"12px" , borderRadius:"50%", width:"20px", height:"20px" }}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <BsChevronBarLeft/>
            </button>
            <button
              type="button"
              className="px-2 py-1 rounded-md text-white"
              style={{ background: currentColor }}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => nextPage()}
              className="px-2 py-1 rounded-md text-white"
              style={{ background: currentColor }}
              disabled={!canNextPage}
            >
              Next
            </button>
            <button
            className=" text-white flex justify-center items-center cursor-pointer"
              style={{ background: currentColor, fontSize:"12px" , borderRadius:"50%", width:"20px", height:"20px" }}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <BsChevronBarRight/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;

{
  /* <div>
      <div className="overflow-y-scroll">
        <table className="min-w-full divide-y-2 divide-gray-200  text-sm">
          <thead /* className="ltr:text-left rtl:text-right" >
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium dark:text-white text-start ">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium dark:text-white text-start">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium dark:text-white text-start">
                Phone Number
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium dark:text-white text-start">
                Gender
              </th>
            </tr>
          </thead>

          <tbody className="">
            {data.map((row, index) => (
              <tr
                key={index}
                className="rounded-lg dark:bg-secondary-dark-bg mt-8 bg-white"
              >
                <td className="whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  {row.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  {row.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  {row.phone}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium dark:text-white ">
                  {row.gender === "Male" ? (
                    <p className="text-blue-500 p-1  bg-blue-300 dark:text-center rounded-full">
                      Male
                    </p>
                  ) : (
                    <p className="text-center p-1 text-pink-500 rounded-full bg-pink-300">
                      Female
                    </p>
                  )}
                </td>
                <td>
                  <button type="button">
                    <BsList />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> */
}


// Footer react use table

{
  /*   <tfoot>
              {footerGroups.map((footerGroup) => (
                <tr {...footerGroup.getFooterGroupProps()}>
                  {footerGroup.headers.map((column) => (
                    <td
                      {...column.getFooterProps()}
                      className="whitespace-nowrap px-4 py-2 font-medium dark:text-white text-start"
                    >
                      {column.render("Footer")}
                    </td>
                  ))}
                </tr>
              ))}
            </tfoot> */
}