import axios from 'axios';

export const getTotalSalesOverTime = async (interval) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/orders/analytics/sales?interval=${interval}`);
        return response;
    } catch (error) {
        console.error('Error fetching total sales data:', error);
        throw error;
    }
};

export const getSalesGrowthRate = async (interval) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/orders/analytics/growth?interval=${interval}`);
        return response;
    } catch (error) {
        console.error('Error fetching sales growth rate data:', error);
        throw error;
    }
};

export const getNewCustomersOverTime = async (interval) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/customers/analytics/new-customers-over-time?interval=${interval}`);
        return response;
    } catch (error) {
        console.error('Error fetching new customers data:', error);
        throw error;
    }
};

export const getRepeatCustomers = async (interval) => {
    try {

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/orders/analytics/repeat-customers?interval=${interval}`);
        return response;

    } catch (error) {
        console.error('Error fetching repeat customers data:', error);
        throw error;
    }
};

export const getGeographicalDistribution = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/customers/analytics/geographical`);
        return response;
    } catch (error) {
        console.error('Error fetching geographical distribution data:', error);
        throw error;
    }
};

export const getCustomerLifetimeValueByCohorts = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/orders/analytics/life-time`);
        return response;
    } catch (error) {
        console.error('Error fetching customer lifetime value data:', error);
        throw error;
    }
};
