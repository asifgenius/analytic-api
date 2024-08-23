import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getGeographicalDistribution } from '../services/apiService.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Geographical = () => {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGeographicalDistribution();
                const repeatCustomerData = response.data.data;
                const labels = repeatCustomerData.map(item => item._id);
                const values = repeatCustomerData.map(item => item.customersCount);

                setData({
                    labels,
                    datasets: [
                        {
                            label: `Geographical`,
                            data: values,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (err) {
                console.error('Error fetching repeat customers data:', err);
                setError('Failed to load data.');
            }
        };
        fetchData();
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div className='chart-card'>
            <Bar className='charts' data={data} options={{
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: `Geographical`
                    }
                }
            }} />
        </div>
    );
};

export default Geographical;