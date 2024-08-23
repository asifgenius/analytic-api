import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getCustomerLifetimeValueByCohorts } from '../services/apiService.js'
const CustomerLifetimeValueChart = () => {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const fetchData = async () => {
        try {
            const lifetimeValueData = await getCustomerLifetimeValueByCohorts();
            const labels = lifetimeValueData.data.map(item => item.customerCount);
            const values = lifetimeValueData.data.map(item => item.avgLifetimeValue);

            setData({
                labels,
                datasets: [
                    {
                        label: 'Customer Lifetime Value by Cohorts',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }
                ]
            });
        } catch (error) {
            console.error('Error fetching customer lifetime value data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='chart-card'>
            <Bar className='charts' data={data} />
        </div>
    );
};

export default CustomerLifetimeValueChart;
