import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Col, Container, Row, Table } from "react-bootstrap";
import data from "../Json/data.json";
import Sidebar from "../Sidebar/Sidebar";
import Graph from "../Graph/Graph";

const DataPage = () => {
  // state for checking if sidebar is open
  const [isOpen, setIsOpen] = useState(false);
  // state for columns
  const [columns, setColumns] = useState([]);
  // list of dates
  const times = Object.keys(data.data);
  // state for index of date
  const [index, setIndex] = useState(0);
  // array state for columns to hide
  const [hide, setHide] = useState([]);
  // state for search input
  const [search, setSearch] = useState("");
  // state for sorting column
  const [sortColumn, setSortColumn] = useState(null);
  // state for sorting order
  const [sortAscending, setSortAscending] = useState(true);

  // useEffect for getting columns
  useEffect(() => {
    const firstKey = Object.keys(data.data[times[index]])[0];
    const firstObject = data.data[times[index]][firstKey];
    const keys = Object.keys(firstObject);

    setColumns((prevColumns) => {
      const newKeys = keys.filter((key) => !prevColumns.includes(key));
      return [...prevColumns, ...newKeys];
    });
  }, [index, times]);

  // function for toggling sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // function for handling column header click
  const handleColumnHeaderClick = (column) => {
    // if column is already sorted, reverse the order
    if (sortColumn === column) {
      setSortAscending(!sortAscending);
    } else {
      setSortColumn(column);
      setSortAscending(true);
    }
  };

  // sorting data based on column and order of sorting
  const sortedData = Object.entries(data.data[times[index]]).sort((a, b) => {
    if (sortColumn === null) {
      return 0;
    }
    // if column is not present in the object, set it to empty string
    const aValue = a[1][sortColumn] || "";
    const bValue = b[1][sortColumn] || "";

    let comparison = 0;
    if (aValue > bValue) {
      comparison = 1;
    } else if (aValue < bValue) {
      comparison = -1;
    }
    // if sort order is ascending, return comparison, else return -comparison
    return sortAscending ? comparison : -comparison;
  });

  return (
    <>
      <Sidebar
        columns={columns}
        hide={hide}
        setHide={setHide}
        isOpen={isOpen}
      />
      <Container style={{ padding: "3rem" }}>
        <Container
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            padding: "3rem",
            marginTop: "3rem",
            borderRadius: "1rem",
          }}
        >
          <Row style={{ justifyContent: "left" }}>
            <Col lg="2">
              <h2 style={{ textAlign: "left" }}>Network</h2>
            </Col>
          </Row>
          <Row style={{ justifyContent: "right" }}>
            <Col lg="2">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setIndex(e.target.value);
                }}
              >
                {times.map((time, index) => (
                  <option key={index} value={index}>
                    {time}
                  </option>
                ))}
              </select>
            </Col>
            <Col lg="2">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </Col>
            <Col lg="2">
              <button
                onClick={toggleSidebar}
                className="btn btn-danger toggle-btn btn-sm"
              >
                Edit Columns
              </button>
            </Col>
          </Row>
          <Row
            style={{
              overflowX: "auto",
            }}
          >
            <Table
              striped
              style={{
                fontSize: "1rem",
                overflowX: "auto",
                marginTop: "1rem",
              }}
            >
              <thead>
                <tr>
                  <th scope="col">Source</th>
                  {columns.map(
                    (column) =>
                      !hide.includes(column) && (
                        <th
                          key={column}
                          scope="col"
                          onClick={() => handleColumnHeaderClick(column)}
                          style={
                            sortColumn === column
                              ? {
                                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                                  cursor: "pointer",
                                  userSelect: "none",
                                }
                              : { cursor: "pointer", userSelect: "none" }
                          }
                        >
                          <div style={{ display: "inline-flex" }}>
                            {column}
                            {sortColumn !== column ? (
                              <i class="bi bi-chevron-bar-expand"></i>
                            ) : sortAscending ? (
                              <i class="bi bi-chevron-up"></i>
                            ) : (
                              <i class="bi bi-chevron-down"></i>
                            )}
                          </div>
                        </th>
                      )
                  )}
                </tr>
              </thead>
              <tbody>
                {sortedData.map(([key, values]) => {
                  const lowerCaseKey = key.toLowerCase();
                  const lowerCaseSearch = search.toLowerCase();
                  const hasSearchMatch =
                    search && lowerCaseKey.includes(lowerCaseSearch);
                  const isEmptySearch = search === "";

                  if (
                    (hasSearchMatch || isEmptySearch) &&
                    !hide.includes(key)
                  ) {
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        {columns.map(
                          (col) =>
                            !hide.includes(col) && (
                              <td key={col}>{values[col]}</td>
                            )
                        )}
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
        <Graph times={times} index={index} data={data} />
      </Container>
    </>
  );
};

export default DataPage;
