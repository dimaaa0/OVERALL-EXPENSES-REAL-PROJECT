import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface Spending {
    category: string;
    amount: number;
    date: string;
}

const PieChart = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('currency') || '$';
    });

    useEffect(() => {
        localStorage.setItem('currency', currency);
    }, [currency]);

    useEffect(() => {
        const spendings: Spending[] = JSON.parse(
            localStorage.getItem("spendings") || "[]"
        );



        if (!chartRef.current) return;

        const chart = echarts.init(chartRef.current);

        // Группируем по категориям
        const categoryMap: Record<string, number> = {};

        spendings.forEach((s) => {
            categoryMap[s.category] = (categoryMap[s.category] || 0) + s.amount;
        });

        const data = Object.keys(categoryMap).map((key) => ({
            name: key,
            value: categoryMap[key],
        }));

        chart.setOption({
            title: {
                text: "Expense distribution",
                left: "center",
            },
            tooltip: {
                trigger: "item",
            },
            legend: {
                orient: "vertical",
                left: "left",
            },
            series: [
                {
                    name: "Spendings",
                    type: "pie",
                    radius: "70%",
                    data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },
            ],
        });

        const handleResize = () => chart.resize();
        window.addEventListener("resize", handleResize);

        return () => {
            chart.dispose();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="pieChart">
            <div className="container">
                <div className="pieChart-content">
                    <div
                        ref={chartRef}
                        style={{
                            width: "100%",
                            height: "350px",
                            marginTop: "20px",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PieChart;