/*
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import {IconButton} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import red from "@material-ui/core/colors/red";

export default function TableContent(props) {

    function createIcon(columnID) {
        return (
            <button>{columnID}</button>
        );
    }

    function createTableCell(row,column) {
        let value = row[column.id];

        if ( column.id === "update" || column.id === "delete" || column.id === "addBook") {
            value = createIcon(column.id);
        }

        return (
            <TableCell key={column.id} align={column.align}>
                {value}
            </TableCell>
        )
    }

    function createTableRow(row) {
        return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.studentNumber}>
                {props.columns.map((column) => {
                    return createTableCell(row,column);
                })}
            </TableRow>
        );
    }

    return (
        <TableBody>
            {props.rows.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((row) => {
                return createTableRow(row);
            })}
        </TableBody>
    );
}
*/


import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";

export default function TableContent(probs) {


    function createTableRow(row) {
        return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.studentNumber}>
                {probs.columns.map((column) => createTableCell(row, column))}
            </TableRow>
        )
    }

    function createTableCell(row, column) {

        let value = row[column.id];

        return (
            <TableCell key={column.id} align={column.align}>
                {value}
            </TableCell>
        );
    }

    return (
        <TableBody>
            {probs.rows.slice(probs.page * probs.rowsPerPage, probs.page * probs.rowsPerPage + probs.rowsPerPage).map((row) => {
                return createTableRow(row);
            })}
        </TableBody>
    )
}