import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, registerables } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);
Chart.register(...registerables);

const LineChart = ({ data }) => {
  const { dates, incomeData, expenseData } = data;

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Total Income',
        data: incomeData,
        borderColor: 'yellow',
        backgroundColor: 'red',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Total Expenses',
        data: expenseData,
        borderColor: 'red',
        backgroundColor: 'green',
        fill: false,
        tension: 0.7,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: $${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2000,
        }
      },
    },
  };

  return (
    <div className='line-chart'>
      <h4>Income and Expenses Over the Last Week</h4>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;