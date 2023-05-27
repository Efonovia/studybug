import React, { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';
import { BarController, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title);

function formatDate(epochTime) {
    const date = new Date(epochTime);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
}
  
  

function StatsBarChart(props) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  function createChart(stats) {
    const canvas = canvasRef.current;
    const scores = stats.map((stat) => stat.score);
    const labels = stats.map((stat) => formatDate(stat.dateTaken));

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvas, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Score",
            data: scores,
            backgroundColor: "purple",
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  const { stats } = props;

  useEffect(() => {
    createChart(stats);
  }, [stats]);

  return (
    <div className='bar-graph-area'>
    <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default StatsBarChart;
