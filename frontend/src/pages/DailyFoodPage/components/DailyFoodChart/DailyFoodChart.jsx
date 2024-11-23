import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: { position: "none" },
    title: { display: true, text: "Doughnut Chart Example" },
  },
};

export const DailyFoodChart = ({ nutrients }) => {
  const data = {
    labels: ["Carbohydrate", "Protein", "Fat"],
    datasets: [
      {
        label: "",
        data: [
          nutrients.carbohydrate || 0,
          nutrients.protein || 0,
          nutrients.fat || 0,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="DailyFoodPage-chart">
        <Doughnut data={data} options={doughnutOptions} />
      </div>
    </>
  );
};
