import React, { useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Reports() {
  const [dateRange, setDateRange] = useState("week");

  // ============================
  // MOCK ANALYTICS DATA
  // ============================

  const topSellingItems = {
    labels: ["Chicken Biryani", "Milk Tea", "Burger", "Pizza", "Fries"],
    datasets: [
      {
        label: "Units Sold",
        data: [120, 95, 80, 70, 50],
        backgroundColor: ["#ff7f00", "#ffa733", "#ffc766", "#ffe3b0", "#ffd199"],
      },
    ],
  };

  const peakHours = {
    labels: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"],
    datasets: [
      {
        label: "Orders",
        data: [10, 25, 50, 40, 30, 70, 55],
        borderColor: "#ff7f00",
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  const customerDemographics = {
    labels: ["Male", "Female", "Youth", "Adults"],
    datasets: [
      {
        label: "Customers",
        data: [45, 55, 35, 65],
        backgroundColor: ["#ff7f00", "#ffc766", "#ffa733", "#ffe3b0"],
      },
    ],
  };

  // ============================
  // EXPORT TO PDF
  // ============================
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Reports & Analytics", 20, 20);

    doc.text("Top Selling Items:", 20, 40);
    topSellingItems.labels.forEach((item, i) => {
      doc.text(`${item}: ${topSellingItems.datasets[0].data[i]} sold`, 20, 50 + i * 8);
    });

    doc.text("Peak Hours:", 20, 120);
    peakHours.labels.forEach((h, i) => {
      doc.text(`${h}: ${peakHours.datasets[0].data[i]} orders`, 20, 130 + i * 8);
    });

    doc.save("analytics-report.pdf");
  };

  // ============================
  // EXPORT TO EXCEL
  // ============================
  const exportExcel = () => {
    const worksheetData = [
      ["Top Selling Items"],
      ["Item", "Units"],
      ...topSellingItems.labels.map((label, i) => [
        label,
        topSellingItems.datasets[0].data[i],
      ]),
      [],
      ["Peak Hours"],
      ["Hour", "Orders"],
      ...peakHours.labels.map((label, i) => [
        label,
        peakHours.datasets[0].data[i],
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    XLSX.writeFile(workbook, "analytics-report.xlsx");
  };

  return (
    <div className="p-6 ml-64 mt-16">
      <h1 className="text-3xl font-bold mb-4">Reports & Analytics</h1>

      {/* FILTER */}
      <div className="flex items-center gap-4 mb-6">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="custom">Custom Range</option>
        </select>

        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
        >
          Export PDF
        </button>

        <button
          onClick={exportExcel}
          className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
        >
          Export Excel
        </button>
      </div>

      {/* GRID FOR CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* TOP SELLING ITEMS */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-3 text-lg">Top Selling Items</h2>
          <Bar data={topSellingItems} />
        </div>

        {/* PEAK HOURS */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-3 text-lg">Peak Ordering Hours</h2>
          <Line data={peakHours} />
        </div>

        {/* CUSTOMER DEMOGRAPHICS */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-semibold mb-3 text-lg">Customer Demographics</h2>
          <Doughnut data={customerDemographics} />
        </div>
      </div>
    </div>
  );
}
export { Reports };
