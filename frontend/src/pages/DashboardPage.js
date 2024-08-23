import React, { useState } from "react";
import TotalSalesChart from "../components/TotalSalesChart";
import RepeatCustomersChart from "../components/RepeatCustomersChart";
import CustomerLifetimeValueChart from "../components/CustomerLifetimeValueChart";
import Geographical from "../components/Geographical";
import GeoMapChart from "../components/GeoMapChart";
import NewCustomersChart from "../components/NewCustomerChart";
import SalesGrowthRateOverTimeChart from "../components/SalesGrowthRateOverTimeChart";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './dashboard-page.css'
import SideBarPage from "./SideBarPage";

const analyticsDropdownOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
]

const DashBoard = () => {
    const [interval, setInterval] = useState('daily');

    return (

        <div className="dashboard">

            <div className='side-bar'>
                <SideBarPage />
            </div>
            <div className="container">
                <h2>Analytics</h2>
                <label className="">
                    <Dropdown className="dropdown-button" options={analyticsDropdownOptions} onChange={(e) => setInterval(e.value)} value={analyticsDropdownOptions[0]} default={interval} placeholder="Select an option" />
                </label>

                <div className="flex">
                    <TotalSalesChart interval={interval} />
                    <SalesGrowthRateOverTimeChart interval={interval} />
                </div>
                <div className="flex">
                    <NewCustomersChart interval={interval} />
                    <RepeatCustomersChart interval={interval} />
                </div>
                <div className="flex">
                    <Geographical />
                    <CustomerLifetimeValueChart />
                </div>

                <div>
                    <GeoMapChart />
                </div>
            </div>
        </div>
    )
}

export default DashBoard;
