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
        borderColor: 'green',
        backgroundColor: 'green',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Total Expenses',
        data: expenseData,
        borderColor: 'red',
        backgroundColor: 'red',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
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
          stepSize: 1000,
        }
      },
    },
  };

  return (
    <div className='line-chart'>
      <h3>Income and Expenses Over the Last 7 Days</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;