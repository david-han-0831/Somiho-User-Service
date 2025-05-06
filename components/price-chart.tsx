"use client"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

interface PriceChartProps {
  country: "korea" | "china" | "japan"
  data: { date: string; price: string }[]
  period: "weekly" | "monthly" | "yearly"
}

export function PriceChart({ country, data, period }: PriceChartProps) {
  // 국가별 색상 설정
  const getCountryColor = (country: string) => {
    switch (country) {
      case "korea":
        return {
          primary: "#F95700",
          secondary: "rgba(249, 87, 0, 0.1)",
        }
      case "china":
        return {
          primary: "#DC2626",
          secondary: "rgba(220, 38, 38, 0.1)",
        }
      case "japan":
        return {
          primary: "#2563EB",
          secondary: "rgba(37, 99, 235, 0.1)",
        }
      default:
        return {
          primary: "#F95700",
          secondary: "rgba(249, 87, 0, 0.1)",
        }
    }
  }

  const colors = getCountryColor(country)

  // 기간에 따른 데이터 필터링
  const filterDataByPeriod = () => {
    const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    switch (period) {
      case "weekly":
        return sortedData.slice(-7)
      case "monthly":
        return sortedData.slice(-30)
      case "yearly":
        return sortedData
      default:
        return sortedData.slice(-7)
    }
  }

  const filteredData = filterDataByPeriod()

  // 차트 데이터 구성
  const chartData = {
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        label: `시세`,
        data: filteredData.map((item) => Number.parseInt(item.price.replace(/,/g, ""))),
        borderColor: colors.primary,
        backgroundColor: colors.secondary,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: colors.primary,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  }

  // 차트 옵션 설정
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 범례 표시 안함
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#111827",
        bodyColor: "#111827",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => `시세: ${context.parsed.y.toLocaleString()}원`,
          title: (context: any) => `${context[0].label}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#6B7280",
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: period === "weekly" ? 7 : period === "monthly" ? 10 : 12,
        },
      },
      y: {
        grid: {
          color: "#F3F4F6",
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#6B7280",
          callback: (value: any) => value.toLocaleString() + "원",
        },
        beginAtZero: false,
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    hover: {
      mode: "nearest" as const,
      intersect: true,
    },
    elements: {
      line: {
        borderJoinStyle: "round" as const,
      },
    },
  }

  return <Line options={options} data={chartData} />
}
