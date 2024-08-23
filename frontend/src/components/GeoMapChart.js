import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './geo-map-chart.css'
import { citiesGeo, defaultLocation } from '../utils/cityGeo.js';
import { getGeographicalDistribution } from '../services/apiService.js'

const CityMap = ({ cities }) => {
    const blueRoundIcon = new L.DivIcon({
        className: 'blue-round-icon',
        html: '<div style="background-color: blue; width: 10px; height: 10px; border-radius: 50%;"></div>',
        iconSize: [7, 7],
        iconAnchor: [2, 2],
    });

    return (
        <MapContainer center={[37.0902, -95.7129]} zoom={4} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cities.map((city, index) => (
                <Marker key={index} position={[city.lat, city.lng]} icon={blueRoundIcon}>
                    <Tooltip>
                        <strong>{city.name}</strong><br />
                        Customers: {city.count}
                    </Tooltip>
                </Marker>
            ))}
        </MapContainer>
    );
};

const GeoChart = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await getGeographicalDistribution();
            const repeatCustomerData = response.data.data;
            let data = []
            repeatCustomerData.forEach(each => {
                data.push({
                    ...(citiesGeo[each._id] ?? defaultLocation), name: each._id, count: each.customersCount
                })
            })

            setData(data)

        } catch (err) {
            console.error('Error fetching repeat customers data:', err);
            setError('Failed to load data.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (error) return <p>{error}</p>;

    if (data.length) {
        return (
            <div className="geo">
                <p className='geo-headline'>Geographical Map Chart</p>
                <CityMap cities={data} />
            </div>
        );
    }

};

export default GeoChart;
