import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const HorizontalBarChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return; // Check if the ref is defined
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return; // Check if the context is defined

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "꽃다발1",
          "꽃다발2",
          "꽃다발3",
          "꽃다발4",
          "꽃다발5",
          "꽃다발6",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
        ],
        datasets: [
          {
            label: "Colors",
            data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
            backgroundColor: "rgba(54, 162, 235, 0.8)",
            borderColor: "rgba(54, 162, 235, 0.8)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        indexAxis: "x",
        scales: {
          x: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div style={{ height: 300 }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default HorizontalBarChart;
