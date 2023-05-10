import React from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

const labels = ["Red", "Blue", "Yellow"];
const data = {
    labels: labels,
    datasets: [{
      label: 'Request rate',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
const PieChart = () => {
  return (
    <div>
      <Pie data={data} />
    </div>
  );
};
export default PieChart;