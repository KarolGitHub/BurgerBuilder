import React from "react";
import { useTable, useBlockLayout, useSortBy } from "react-table";
import "./ReactTable.css";

const ReactTable = ({ columns, data }) => {
  const { headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useBlockLayout,
    useSortBy
  );

  return (
    <table className={"rtable"}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr key={i}>
            {headerGroup.headers.map((column, i) => {
              return (
                <th key={i} {...column.getSortByToggleProps()}>
                  {column.render("Header")}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr key={i}>
              {row.cells.map((cell, i) => {
                return <td key={i}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReactTable;
