import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    //decimation: decimation,
  },
};

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}

export default function LineChart(props) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (props.data.length == 0) return;
    let chartDataset = {
      labels: [],
      datasets: [],
    };
    const data = props.data;
    for (let [key] of Object.entries(data[0])) {
      if (key !== "dateId" && key !== "stationId") {
        const color = random_rgba();
        chartDataset.datasets.push({
          label: key,
          data: [],
          borderColor: color,
          backgroundColor: color,
        });
      }
    }
    chartDataset.labels = data.map((item) => item.dateId);
    chartDataset.datasets.forEach((dataset) => {
      dataset.data = data.map((item) => item[dataset.label]);
    });

    console.log(chartDataset);
    setChartData(chartDataset);
  }, [props.data]);

  return (
    <div style={{ flexGrow: 4 }}>
      {chartData && <Line options={options} data={chartData} />}
    </div>
  );
}
