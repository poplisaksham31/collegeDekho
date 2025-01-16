import { Modal } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import styles from './ChartComponent.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartComponent({
  show = false,
  setShow = () => {},
  articles,
}) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (articles?.length) {
      const articleTypes = articles?.map((article) => article.sectionName);
      const typeCounts = articleTypes?.reduce((acc, sectionName) => {
        acc[sectionName] = (acc[sectionName] || 0) + 1;
        return acc;
      }, {});
      const labels = Object.keys(typeCounts);
      const data = Object.values(typeCounts);
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Articles by SectionName",
            data: data,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [articles]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered={true}
      className={styles.ChartModal}
      style={{ zIndex: "2005" }}
    >
      {chartData?.labels?.length?<div>
        <h3>Article Section Name Distribution</h3>
        <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Article Section',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Count',
              },
              beginAtZero: true,
            },
          },
        }}
      />
      </div>: null}
    </Modal>
  );
}
