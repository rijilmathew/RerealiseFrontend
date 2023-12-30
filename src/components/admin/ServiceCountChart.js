import React, { useEffect } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Bar  } from "react-chartjs-2";
import axios from 'axios';

Chart.register(CategoryScale);


const ServiceCountChart = () => {
    const [chartData, setChartData] = useState({
        labels: ['CareHome', 'Proffesionals'],
        datasets: [], // Initialize datasets as an empty array
      });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('admindashboard/services-count/');
          const data = response.data;
          console.log('Data',data)
  
          setChartData({
            labels: ['CareHome', 'Proffesionals'],
            datasets: [
              {
                data: [data.carehome_count || 0, data.person_count || 0],
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
    <h2 style={{ textAlign: "center" }}> Provided Service </h2>
    <Bar
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Service Provided between 2022-2023"
          },
          legend: {
            display: false
          }
          
        }
      }}
    />
  </div>
  )
}

export default ServiceCountChart