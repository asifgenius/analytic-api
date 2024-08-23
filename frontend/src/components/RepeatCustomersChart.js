
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getRepeatCustomers } from '../services/apiService.js'
import './total-sales-chart.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RepeatCustomersChart = ({ interval }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    const fetchData = async () => {
        try {
            const response = await getRepeatCustomers(interval);
            const salesData = response.data;
            const labels = salesData.map((item) => item._id);
            const sales = salesData.map((item) => item.customerCount);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Repeat Customers',
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
                text: 'Repeat Customers',
            },
        },
    };

    return (
        <div className='chart-card'>
            <Bar className='charts' data={chartData} options={options} />
        </div>
    );
};

export default RepeatCustomersChart;
