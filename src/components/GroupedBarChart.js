import React from "react";
import { Bar } from "react-chartjs-2";

const Chart = ({ data }) => {
  return (
    <div>
      <h2>Account Engagement Chart</h2>
      <Bar
        data={data}
        options={{
          indexAxis: "y", // Display bars vertically
          plugins: {
            legend: {
              position: "top", // Position legend on top
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true, // Stack bars horizontally
            },
            y: {
              stacked: true, // Stack bars vertically
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
