import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Chart } from "react-chartjs-2";
import { useRecoilValue } from "recoil";
import { storeId } from "../../recoil/atom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // 스타일 시트를 임포트합니다.
import "react-date-range/dist/theme/default.css"; // 테마를 임포트합니다.
ChartJS.register(...registerables);

export default function BarChart() {
  const [chartData, setChartData] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(new Date());
  const myStoreId = useRecoilValue(storeId);
  // const [selectedRange, setSelectedRange] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://flowery.duckdns.org/api/sales/goods",
        {
          params: {
            storeId: myStoreId,
            startDate: startDate.toISOString().split("T")[0] + "T00:00:00",
            endDate: endDate.toISOString().split("T")[0] + "T00:00:00",
          },
        }
      );
      setChartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const labels = chartData.map((item) => item[0]);
  const dataValues = chartData.map((item) => item[1]);
  const backgroundColors = chartData.map(
    () =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.2)`
  );
  const borderColors = chartData.map(
    () =>
      `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1)`
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const maxDataValue = Math.max.apply(null, data.datasets[0].data);
  const maxTickValue = Math.ceil(maxDataValue / 10) * 10;

  const options = {
    indexAxis: "x" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {},
    scales: {
      y: {
        beginAtZero: true,
        max: maxTickValue,
        ticks: {
          stepSize: maxTickValue / 10,
        },
      },
    },
  };
  // const handleSelect = (ranges: any) => {
  //   setSelectedRange([ranges.selection]);
  // };

  return (
    <div className="w-[100%] flex justify-center">
      <Bar data={data} options={options} />
      {/* <DateRange
          editableDateInputs={true}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          ranges={selectedRange}
        /> */}
    </div>
  );
}
