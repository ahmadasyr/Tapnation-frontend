import { React } from "react";
import "./Sidebar.css";
import { Row, Col, ToggleButton } from "react-bootstrap";
export default function Sidebar(props) {
  // function for handling checkbox change
  const handleCheckboxChange = (column) => {
    props.setHide((prevHide) =>
      prevHide.includes(column)
        ? prevHide.filter((item) => item !== column)
        : [...prevHide, column]
    );
  };

  return (
    <div className={`sidebar ${props.isOpen ? "active" : ""}`}>
      <h6 className="m-2">Select columns to hide</h6>
      {props.columns.map((column) => (
        <Row key={column}>
          <Col lg="12" style={{ padding: "1rem 1rem 0 1rem" }}>
            <ToggleButton
              style={{ width: "100%" }}
              id={`toggle-check-${column}`}
              type="checkbox"
              variant="outline-success"
              checked={!props.hide.includes(column)}
              onChange={() => handleCheckboxChange(column)}
            >
              {column}
            </ToggleButton>
          </Col>
        </Row>
      ))}
    </div>
  );
}
