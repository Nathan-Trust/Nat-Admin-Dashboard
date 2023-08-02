import { BsList } from "react-icons/bs";
// import BasicTable from "./table/BasicTable";
import { useTable, useSortBy } from "react-table";
import { COLUMNS } from "./table/Columns";
import { useMemo } from "react";
import MOCK_DATA from "./table/MOCK_DATA.json";
import { ArrowUpOutlined , ArrowDownOutlined} from "@ant-design/icons";

const SortingTable = ({ data }) => {
  const columns = useMemo(() => COLUMNS, []);
  const rowData = useMemo(() => data, [data]);

  const tableInstance = useTable(
    {
      columns,
      data: rowData,
    },
    useSortBy
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div>
      <div>
        <table
          className="min-w-full divide-y-2 divide-gray-200 text-sm"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="whitespace-nowrap px-4 py-2 font-medium dark:text-white text-start"
                  >
                        {column.render("Header")}
                        <span>
                            {column.isSorted ? (column.isSortedDesc ? <ArrowDownOutlined/> : <ArrowUpOutlined/> ): " "}
                        </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="" {...getTableBodyProps()}>
            {rows.map((row) => {
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
                        className="whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
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
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default SortingTable;
