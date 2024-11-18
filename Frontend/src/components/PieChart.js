import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, registerables } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);
Chart.register(...registerables);

const PieChart = ({ data, labels, title, color, showLegend = false }) => {
    const chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          borderColor: color,
          backgroundColor: color,
          hoverBackgroundColor: color,
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: showLegend, 
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ₹${context.raw.toFixed(2)}`;
            },
          },
        },
      },
    };
  
    return (
      <div style={{ height: '200px', width: '200px' }}>
        <h3>{title} Chart</h3>
        <Doughnut data={chartData} options={options} />
      </div>
    );
  };
  
  export default PieChart;