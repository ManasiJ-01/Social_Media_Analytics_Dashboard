import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
  console.log("Data for BarChart:", data); // Log data to inspect
  return (
    <div className="chart">
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
