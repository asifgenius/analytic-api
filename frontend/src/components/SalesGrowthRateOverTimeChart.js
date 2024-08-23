import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto'
import { getSalesGrowthRate } from '../services/apiService.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesGrowthRateOverTimeChart = ({ interval }) => {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [error, setError] = useState(null);
    const fetchData = async () => {
        try {
            const response = await getSalesGrowthRate(interval);
            const repeatCustomerData = response.data.data;
            const labels = response.data.map((item) => item.period);
            const sales = response.data.map((item) => parseFloat(item.growthRate));

            setData({
                labels,
                datasets: [
                    {
                        label: `Sales Growth Rate Over Time`,
                        data: sales,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (err) {
            console.error('Error fetching repeat customers data:', err);
            setError('Failed to load data.');
        }
    };

    useEffect(() => {
        fetchData();
    }, [interval]);

    if (error) return <p>{error}</p>;

    return (
        <div className='chart-card'>
            <Line className='charts' data={data} options={{
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: `Sales Growth Rate Over Time`
                    }
                }
            }} />
        </div>
    );
};

export default SalesGrowthRateOverTimeChart;
