import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

function StatsLineChart(props) {
  const { stats } = props;
  const chartContainer = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (stats && chartContainer.current) {
      // destroy existing chart if present
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const chartData = {
        labels: stats.map((stat) => new Date(stat.dateTaken).toLocaleDateString()),
        datasets: [{
          label: 'Score',
          data: stats.map((stat) => stat.score),
          fill: false,
          borderColor: 'purple',
          tension: 0.1
        }]
      };

      const chartOptions = {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date Taken'
            }
          },
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: 'Score'
            }
          }
        }
      };

      chartRef.current = new Chart(chartContainer.current, {
        type: 'line',
        data: chartData,
        options: chartOptions
      });
    }
  }, [stats, chartContainer, chartRef]);

  return (
    <div className='graph-area'>
      <h2 style={{ textAlign: "center" }}>Score Trend Over Time</h2>
      <canvas ref={chartContainer} />
    </div>
  );
}

export default StatsLineChart;
