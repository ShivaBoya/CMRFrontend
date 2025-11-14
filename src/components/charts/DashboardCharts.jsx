import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function DashboardCharts({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Closed Deals",
        data: data.values,
        borderColor: "blue",
        tension: 0.3,
      },
    ],
  };
  return (
    <div className="bg-white p-4 rounded shadow">
      <Line data={chartData} />
    </div>
  );
}
