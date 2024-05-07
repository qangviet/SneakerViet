import React from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const months = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
    ];

    const chartData = {
        labels: months,
        datasets: [
            {
                label: "Số lượng đơn hàng",
                data: [12, 19, 3, 5, 2, 3, 7, 8, 9, 10, 11, 12],
                backgroundColor: "rgba(75,192,192,0.6)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: false,
                    },
                },
            ],
            xAxes: [
                {
                    barPercentage: 0.1,
                },
            ],
        },
        annotation: {
            annotations: [
                {
                    type: "line",
                    mode: "vertical",
                    scaleID: "x-axis-0",
                    value: "Tháng 6",
                    borderColor: "red",
                    borderWidth: 2,
                    label: {
                        enabled: false,
                        content: "Chú thích",
                    },
                },
            ],
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default BarChart;
