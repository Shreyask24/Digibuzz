import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function ChartWidget() {
  const [chartType, setChartType] = useState("Bar");
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState("7d");

  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  // Generate random data based on date range
  useEffect(() => {
    const points = { "7d": 7, "30d": 30, "90d": 90 }[dateRange];
    const newData = Array.from({ length: points }, (_, i) => ({
      name: `Day ${i + 1}`,
      sales: Math.floor(Math.random() * 1000) + 100,
      profit: Math.floor(Math.random() * 500) + 50,
    }));
    setData(newData);
  }, [dateRange]);

  const CustomTooltip = ({ active, payload, label }) =>
    active && payload?.length ? (
      <div className="bg-gray-900 border border-gray-700 p-3 rounded-lg text-sm text-white">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((entry) => (
          <p key={entry.dataKey} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    ) : null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Sales & Profit Analytics
      </h2>

      {/* Chart Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="bg-gray-800 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Bar">Bar Chart</option>
          <option value="Line">Line Chart</option>
          <option value="Pie">Pie Chart</option>
        </select>

        <div className="flex gap-2">
          {["7d", "30d", "90d"].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-2 rounded-lg text-sm ${
                dateRange === range
                  ? "bg-indigo-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {`Last ${range.replace("d", " Days")}`}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Display */}
      <div className="w-full h-80">
        <ResponsiveContainer>
          {chartType === "Bar" && (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="sales" fill="#6366F1" name="Sales" />
              <Bar dataKey="profit" fill="#10B981" name="Profit" />
            </BarChart>
          )}

          {chartType === "Line" && (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#6366F1"
                name="Sales"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10B981"
                name="Profit"
              />
            </LineChart>
          )}

          {chartType === "Pie" && (
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Pie
                dataKey="sales"
                data={data.slice(0, 5)}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {data.slice(0, 5).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
