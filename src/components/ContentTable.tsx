import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Despesa } from "../domain/Despesa";
import { darkTheme } from "../Styles";
import { toCurrency } from "../helpers/Utils";

interface Column {
  id: "descricao" | "categoria" | "dia" | "valor";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "descricao", label: "Despesa", minWidth: 170 },
  { id: "categoria", label: "Categoria", minWidth: 100 },
  {
    id: "dia",
    label: "Dia",
    minWidth: 170,
    align: "right",
  },
  {
    id: "valor",
    label: "Valor (R$)",
    minWidth: 170,
    align: "right",
    format: (value: number) => toCurrency(value),
  },
];

const background = "#2B2B2C";

const useStyles = makeStyles({
  root: {
    width: "100%",
    background: darkTheme.background,
  },
  container: {
    maxHeight: 600,
  },
  tableHeader: {
    background,
    color: darkTheme.color,
    fontWeight: 800,
  },
  tableContent: {
    color: darkTheme.color,
  },
  tableFooter: {
    background,
    color: darkTheme.color,
  },
});

type props = {
  despesas: Despesa[];
};

export default function ContentTable({ despesas }: props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={classes.tableHeader}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {despesas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        className={classes.tableContent}
                        key={column.id}
                        align={column.align}
                      >
                        {column.format && typeof value === "number" ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="Despesas por página:"
        className={classes.tableFooter}
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={despesas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
