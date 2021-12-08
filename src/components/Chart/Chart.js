import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart(props) {
  const label = props.data.map((key, val) => {
    return "rating";
  });

  const data = {
    labels: label,
    datasets: [
      {
        label: "Ratings distribution",
        data: props.data,
        backgroundColor: ["#aebcb2", "#9fb7cc", "#686b6d", "#d8dde1"],
        borderColor: ["#aebcb2", "#9fb7cc", "#686b6d", "#d8dde1"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} height={"50%"} width={"50%"}></Pie>;
}
export default PieChart;
