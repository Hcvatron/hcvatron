import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./AboutChart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaChartArea, FaChartPie } from "react-icons/fa";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AboutChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, "rgba(72, 166, 242, 0.5)"); // Light Blue
      gradient.addColorStop(1, "rgba(72, 166, 242, 0.1)"); // Faded Blue

      chartRef.current.data.datasets[0].backgroundColor = gradient;
      chartRef.current.update();
    }
  }, []);

  const data = {
    labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Company Growth (%)",
        data: [15, 30, 45, 65, 80, 98],
        borderColor: "#48A6F2",
        backgroundColor: "#b78a4d", // Blue shade
        borderWidth: 3,
        pointBackgroundColor: "#48A6F2",
        pointBorderColor: "#fff",
        pointHoverRadius: 7,
        tension: 0.4, // Smooth line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333",
          font: { size: 14 },
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "#48A6F2",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#555" },
        grid: { color: "rgba(0, 0, 0, 0.05)" },
      },
      y: {
        ticks: { color: "#555", callback: (value) => `${value}%` },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
    },
  };

  return (
    <div className="aboutgrowth">
    <h2>Our Company Growth</h2>
      <p className="aboutValues__subtitle">
        The one-stop destination for antivirus, Windows OS, and printer solutions.
      </p>
    <div className="growthChartContainer">
      <h2><FaChartArea /> Company Growth Over the Years</h2>
      <p>Our progress from 2020 to 2025.</p>
      <div className="chartWrapper">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>  
    </div>
  );
};

export default AboutChart;
