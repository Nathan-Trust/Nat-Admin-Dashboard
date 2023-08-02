import { format } from "date-fns";
import ColumnFilter from "./ColumnFilter";
import Gender from "./Gender";

export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "Name",
    Footer: "Name",
    accessor: "name",
    disableFilters: true,
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "email",
    disableFilters: true,
  },
  {
    Header: "Phone Number",
    Footer: "Phone Number",
    accessor: "phone",
    disableFilters: true,
  },
  {
    Header: "Gender",
    Footer: "Gender",
    accessor: "gender",
  },
];

export const COLUMNS_MID_SCREENS = [
  {
    Header: "Name",
    Footer: "Name",
    accessor: "name",
    disableFilters: true,
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "email",
    disableFilters: true,
  }
];