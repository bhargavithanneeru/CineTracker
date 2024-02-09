import React from "react";
import { Bar } from "react-chartjs-2"
import 'chart.js/auto'


function BarChart({ chartData }) {
  return (
    <div
      style={{
        height: "700px",
        width: "100%",
        position: "relative",
        marginBottom: "1%",
        float: "right",
      }}
    >
      <Bar data={chartData} />
    </div>
  );
}

export default BarChart;
