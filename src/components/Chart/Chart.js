import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart(props) {

  const arr = props.data;
  const fr = [0, 0, 0, 0, 0];

  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < 6; j++) {
      if (arr[i] == j + 1) {
        fr[j]++;
      }
    }
  }

  const data = {
    labels:["one star","two stars","three stars","four stars","five stars"],
    datasets: [
      {
        label: "Ratings distribution",
        data: fr,
        backgroundColor: ["#686b6d","#B59FCD",  "#d8dde1", "#9fb7cc","#aebcb2"],
        borderColor: ["#686b6d", "#B59FCD",  "#d8dde1", "#9fb7cc","#aebcb2"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} height={"50%"} width={"50%"}></Pie>;
}
export default PieChart;
