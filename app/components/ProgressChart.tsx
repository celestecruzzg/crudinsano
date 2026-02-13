"use client";

import { Filter, BicepsFlexed } from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, type ChartOptions, type GridLineOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ProgressChart() {
  const data = {
    labels: ["Día 1", "Día 2", "Día 3", "Día 4", "Día 5", "Día 6", "Día 7"],
    datasets: [{
      data: [70, 70, 70, 69, 69, 69, 69],
      borderColor: "#B6D99B",
      backgroundColor: "#B6D99B",
      borderWidth: 3,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBackgroundColor: "#B6D99B",
      pointBorderColor: "#B6D99B",
      tension: 0,
    }],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#374151",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#B6D99B",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function (context) { return `${context.parsed.y}`; },
        },
      },
    },
    scales: {
      x: { grid: { display: false }, border: { display: false }, ticks: { color: "#6b7280", font: { size: 12 } } },
      y: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20, color: "#6b7280", font: { size: 12 } },
        grid: { color: "#e5e7eb", borderDash: [5, 5] } as unknown as GridLineOptions,
        border: { display: false },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-medium text-gray-800">Tú progreso - Semanal</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <span className="text-sm text-gray-600">Semanal</span>
          <Filter className="w-4 h-4 text-[var(--color-green)]" />
        </div>
      </div>
      <div className="h-64 mb-8">
        <Line data={data} options={options} />
      </div>
      <div className="bg-gray-50 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-600">Ejercicios completados</h3>
          <div className="flex items-center gap-2">
            <BicepsFlexed className="w-5 h-5 text-[var(--color-green)]" />
            <span className="text-gray-600 font-regular">3 de 5 esta semana</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
