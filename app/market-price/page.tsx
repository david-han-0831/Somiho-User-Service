"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Sample data
const koreaData = [
  { date: "2025-03-18", avg: 12200, high: 14800, low: 10500 },
  { date: "2025-03-19", avg: 12300, high: 15000, low: 10600 },
  { date: "2025-03-20", avg: 12100, high: 14700, low: 10400 },
  { date: "2025-03-21", avg: 12400, high: 15100, low: 10700 },
  { date: "2025-03-22", avg: 12500, high: 15200, low: 10800 },
  { date: "2025-03-23", avg: 12600, high: 15300, low: 10900 },
  { date: "2025-03-24", avg: 12500, high: 15200, low: 10800 },
]

const chinaData = [
  { date: "2025-03-18", avg: 84.5, high: 91.2, low: 77.8 },
  { date: "2025-03-19", avg: 85.1, high: 92.0, low: 78.2 },
  { date: "2025-03-20", avg: 84.8, high: 91.5, low: 78.0 },
  { date: "2025-03-21", avg: 85.5, high: 92.3, low: 78.7 },
  { date: "2025-03-22", avg: 86.2, high: 93.1, low: 79.3 },
  { date: "2025-03-23", avg: 86.3, high: 93.2, low: 79.4 },
  { date: "2025-03-24", avg: 85.2, high: 92.5, low: 78.3 },
]

const japanData = [
  { date: "2025-03-18", avg: 1320, high: 1480, low: 1160 },
  { date: "2025-03-19", avg: 1330, high: 1490, low: 1170 },
  { date: "2025-03-20", avg: 1340, high: 1500, low: 1180 },
  { date: "2025-03-21", avg: 1335, high: 1495, low: 1175 },
  { date: "2025-03-22", avg: 1345, high: 1505, low: 1185 },
  { date: "2025-03-23", avg: 1350, high: 1510, low: 1190 },
  { date: "2025-03-24", avg: 1350, high: 1520, low: 1180 },
]

type Country = "korea" | "china" | "japan"
type Period = "daily" | "weekly" | "monthly"

export default function MarketPricePage() {
  const [country, setCountry] = useState<Country>("korea")
  const [period, setPeriod] = useState<Period>("daily")

  // Get data based on selected country
  const getData = () => {
    switch (country) {
      case "korea":
        return koreaData
      case "china":
        return chinaData
      case "japan":
        return japanData
      default:
        return koreaData
    }
  }

  // Get currency symbol based on selected country
  const getCurrencySymbol = () => {
    switch (country) {
      case "korea":
        return "₩"
      case "china":
        return "¥"
      case "japan":
        return "¥"
      default:
        return "₩"
    }
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">김 시세 정보</h1>

        {/* Country Tabs */}
        <div className="mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-3 px-6 font-medium ${
                country === "korea" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setCountry("korea")}
            >
              한국
            </button>
            <button
              className={`py-3 px-6 font-medium ${
                country === "china" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setCountry("china")}
            >
              중국
            </button>
            <button
              className={`py-3 px-6 font-medium ${
                country === "japan" ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setCountry("japan")}
            >
              일본
            </button>
          </div>
        </div>

        {/* Period Selection */}
        <div className="mb-8">
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="period"
                value="daily"
                checked={period === "daily"}
                onChange={() => setPeriod("daily")}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2 text-gray-700">일간</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="period"
                value="weekly"
                checked={period === "weekly"}
                onChange={() => setPeriod("weekly")}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2 text-gray-700">주간</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="period"
                value="monthly"
                checked={period === "monthly"}
                onChange={() => setPeriod("monthly")}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2 text-gray-700">월간</span>
            </label>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4">
            {country === "korea" ? "한국" : country === "china" ? "중국" : "일본"} 김 시세 차트
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getData()} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F95700" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F95700" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  stroke="#888888"
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: "#E5E7EB" }}
                  tickLine={{ stroke: "#E5E7EB" }}
                />
                <YAxis
                  stroke="#888888"
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: "#E5E7EB" }}
                  tickLine={{ stroke: "#E5E7EB" }}
                  tickFormatter={(value) => `${getCurrencySymbol()}${value.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(value) => [`${getCurrencySymbol()}${Number(value).toLocaleString()}`, undefined]}
                  labelFormatter={(label) => `${formatDate(label)}`}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    border: "none",
                  }}
                  itemStyle={{ padding: "4px 0" }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{ paddingBottom: "10px" }}
                />
                <Line
                  type="monotone"
                  dataKey="high"
                  name="최고가"
                  stroke="#F95700"
                  strokeWidth={3}
                  dot={{ stroke: "#F95700", strokeWidth: 2, r: 4, fill: "white" }}
                  activeDot={{ r: 6, stroke: "#F95700", strokeWidth: 2, fill: "white" }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
                <Line
                  type="monotone"
                  dataKey="avg"
                  name="평균가"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ stroke: "#3b82f6", strokeWidth: 2, r: 4, fill: "white" }}
                  activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: "white" }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
                <Line
                  type="monotone"
                  dataKey="low"
                  name="최저가"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ stroke: "#22c55e", strokeWidth: 2, r: 4, fill: "white" }}
                  activeDot={{ r: 6, stroke: "#22c55e", strokeWidth: 2, fill: "white" }}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">
            {country === "korea" ? "한국" : country === "china" ? "중국" : "일본"} 김 시세 데이터
          </h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  평균가
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  최고가
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  최저가
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  전일대비
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...getData()].reverse().map((item, index, reversedArray) => {
                const nextItemIndex = index + 1
                const nextItem = nextItemIndex < reversedArray.length ? reversedArray[nextItemIndex] : null
                const change = nextItem ? (((item.avg - nextItem.avg) / nextItem.avg) * 100).toFixed(1) : "0.0"
                const isPositive = Number.parseFloat(change) > 0
                const isNegative = Number.parseFloat(change) < 0

                return (
                  <tr key={item.date}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(item.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getCurrencySymbol()}
                      {item.avg.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getCurrencySymbol()}
                      {item.high.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getCurrencySymbol()}
                      {item.low.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`
                ${isPositive ? "text-green-600" : ""}
                ${isNegative ? "text-red-600" : ""}
                ${!isPositive && !isNegative ? "text-gray-500" : ""}
              `}
                      >
                        {isPositive ? "+" : ""}
                        {change}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
