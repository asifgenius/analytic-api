import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './total-sales-chart.css'
import { getTotalSalesOverTime } from '../services/apiService.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalSalesChart = ({ interval }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const fetchData = async () => {
    try {
      const response = await getTotalSalesOverTime(interval);
      const salesData = response.data;

      const labels = salesData.map((item) => item._id);
      const sales = salesData.map((item) => item.totalSales);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Total Sales Over Time',
            data: sales,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [interval]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Sales Over Time',
      },
    },
  };

  return (
    <div className='chart-card'>
      <Bar className='charts' data={chartData} options={options} />
    </div>
  );
};

export default TotalSalesChart;
