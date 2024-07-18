import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Category Distribution",
        data: data.datasets[0].data,
        backgroundColor: data.datasets[0].backgroundColor,
        borderColor: data.datasets[0].borderColor,
        borderWidth: data.datasets[0].borderWidth,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = chartData.datasets[0];
            const total = dataset.data.reduce((acc, curr) => acc + curr, 0);
            const value = dataset.data[tooltipItem.index];
            const percentage = ((value / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="chart">
      <Pie
        data={chartData}
        options={options}
        style={{ width: "200px", height: "200px" }}
      />
    </div>
  );
};

export default PieChart;
