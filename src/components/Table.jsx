import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

// const extractValues = (data) => {
//   // Extract values using Object.values and filter out metadata keys
//   const values = data.map(
//     (obj) =>
//       Object.values(obj).filter((key) => !key.startsWith("_") && key !== "__v" && key !== "updatedAt" && key !== "createdAt" && key !== "fileBelong")
//   );

//   return values;
// };

const extractKeys = (data) => {
  // Get all object keys (excluding special properties) using Object.keys and filter
  const keys = Object.keys(data[0]).filter(
    (key) =>
      !key.startsWith("_") &&
      key !== "__v" &&
      key !== "updatedAt" &&
      key !== "createdAt" &&
      key !== "fileBelong"
  );

  return keys;
};

export default function DataTable({ tableName, data, headers }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [bgcolor, setBgColor] = React.useState("");
  // const [data, setData] = useState([]);
  // const [headers, setHeaders] = useState([]);
  // const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
console.log(data);
console.log(headers);

  // const fetchData = async () => {
  //   setLoading(true);
  //   setError(null);
  //   const fileId = sessionStorage.getItem("fileId");
  //   try {
  //     const response = await axios.get("http://localhost:3000/getInValidData");
  //     const data1 = response.data;
  //     console.log(data1.data);
  //     const keys = extractKeys(data1.data);
  //     console.log(keys);
  //     setHeaders(keys);
  //     setData(data1.data);
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  //   setLoading(false);
  // }, []);

  React.useEffect(() => {
    if (tableName.includes("In")) {
      setBgColor("red");
      console.log(bgcolor);
    } else setBgColor("green");
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return data.length <=0  ? (
    <div></div>
  ) : (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        {tableName}
      </Typography>
      <TableContainer sx={{ maxHeight: 150 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead bg>
            <TableRow>
              {headers.map((column) => (
                <TableCell
                  key={column}
                  // align={column.align}
                  // style={{ minWidth: column.minWidth }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody> */}
          {data.length > 0 ? (
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {headers.map((header) => {
                      const value = row[header];
                      return (
                        <TableCell key={header} >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          ) : (
            <p>Loading data...</p>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

DataTable.propTypes = {
  tableName: PropTypes.string,
};
