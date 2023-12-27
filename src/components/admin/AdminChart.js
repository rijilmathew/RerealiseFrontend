import React, { useEffect } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from 'axios';

Chart.register(CategoryScale);


const AdminChart = () => {
    const [chartData, setChartData] = useState({
        labels: ['Users', 'Providers'],
        datasets: [], // Initialize datasets as an empty array
      });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/admindashboard/user-provider-count/');
          const data = response.data;
          console.log('Data',data)
  
          setChartData({
            labels: ['Users', 'Providers'],
            datasets: [
              {
                data: [data.user_count || 0, data.provider_count || 0],
                backgroundColor: ['#3498db', '#e74c3c'],
                borderColor: 'black',
                borderWidth: 2,
              },
            ],
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
  return (
    <div className="chart-container">
    <h2 style={{ textAlign: "center" }}>Users</h2>
    <Pie
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Users Gained between 2023-2024"
          }
        }
      }}
    />
  </div>
  )
}

export default AdminChart