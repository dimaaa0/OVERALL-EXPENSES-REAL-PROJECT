import React from "react";
import '../../components/PieChart/pieChart.scss'
import ReactECharts from "echarts-for-react";

const PieChartComponent: React.FC = () => {
    const spending = localStorage.getItem("spendings");
    const parsedSpendings = spending ? JSON.parse(spending) : [];

    const chartData = parsedSpendings.map(
        (item: { name: string; amount: number }) => ({
            value: item.amount,
            name: item.name
        })

    );


    const option = {
        title: { text: "Expenses by Category", left: "center" },
        tooltip: { trigger: "item" },
        legend: { orient: "vertical", left: "left" },
        series: [
            {
                type: "pie",
                radius: "50%",
                data: chartData
            }
        ]
    };

    return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default PieChartComponent;
