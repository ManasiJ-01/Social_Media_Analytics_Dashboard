import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ data }) => {
  return (
    <div className="chart">
      <Line data={data} />
    </div>
  );
};

export default LineChart;
