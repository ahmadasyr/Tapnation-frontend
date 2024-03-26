import { React, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Container, Row, Col, Form } from "react-bootstrap";
import dummyGraphs from "../Json/graphs.json";
import colors from "../Json/colors.json";
export default function Graph(props) {
  // state for graphs
  const [graphs, setGraphs] = useState(dummyGraphs);
  // constant graph data
  const data = props.data;
  // function for getting graph data
  const graphData = (columnName, index) => {
    return {
      labels: props.times.slice(0, -1),
      datasets: Object.keys(data.data[props.times[index]]).map((key, idx) => {
        return {
          label: key,
          data: Object.values(data.data).map((date) => date[key][columnName]),
          fill: false,
          backgroundColor: colors[idx],
          borderColor: colors[idx],
        };
      }),
    };
  };
  // function for setting options
  const options = (stacked) => {
    return {
      tension: 0.4,
      scales: {
        xAxes: [
          {
            stacked: stacked,
          },
        ],
        yAxes: [
          {
            stacked: stacked,
          },
        ],
      },
      pan: {
        enabled: true,
        mode: "x",
      },
      zoom: {
        enabled: true,
        mode: "x",
        sensitivity: 0.5,
      },
    };
  };
  return (
    <>
      {graphs.map((graph, index) => {
        return (
          <Row>
            <Container
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                padding: "3rem",
                marginTop: "3rem",
                borderRadius: "1rem",
              }}
            >
              <h2 style={{ textAlign: "left" }}>{graph.label}</h2>
              <Row>
                <Col style={{ maxWidth: "fit-content" }}>
                  <p style={{ fontSize: "0.9rem", color: "gray" }}>UnStacked</p>
                </Col>
                <Col style={{ maxWidth: "fit-content" }}>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    onChange={() => {
                      setGraphs((prevGraphs) => {
                        const newGraphs = [...prevGraphs];
                        newGraphs[index].stacked = !newGraphs[index].stacked;
                        return newGraphs;
                      });
                    }}
                  />
                </Col>
                <Col style={{ maxWidth: "fit-content" }}>
                  <p style={{ fontSize: "0.9rem", color: "gray" }}>Stacked</p>
                </Col>
              </Row>
              <Line
                data={graphData(graph.columnName, index)}
                options={options(graph.stacked)}
              />
            </Container>
          </Row>
        );
      })}
    </>
  );
}
