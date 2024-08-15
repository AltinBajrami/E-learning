// LoggedInUsersChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import customFetch from '../../utilities/customFetch';

const LoggedInUsersChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadChartData = async () => {
            try {
                const { data } = await customFetch('/users/users-logged-in-24-hours');
                const users = data?.users || [];

                if (users && users.length > 0) {
                    const userCount = users.length;

                    setChartData({
                        labels: ['Logged In Users'],
                        datasets: [
                            {
                                label: 'Number of Users',
                                data: [userCount],
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    });
                } else {
                    setError('No users logged in the last 24 hours.');
                }
            } catch (error) {
                console.error('Error loading chart data:', error);
                setError('Error loading chart data.');
            } finally {
                setLoading(false);
            }
        };

        loadChartData();
    }, []);

    if (loading) {
        return <div>Loading chart...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Users Logged In Last 24 Hours</h2>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Time Period',
                            },
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Users',
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default LoggedInUsersChart;
