import { useEffect, useState } from "react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
const data2 = [
    {
        year: 2023,
        details: [
            { name: "Tháng 1", "Doanh thu": 2500000 },
            { name: "Tháng 2", "Doanh thu": 3700000 },
            { name: "Tháng 3", "Doanh thu": 590000 },
            { name: "Tháng 4", "Doanh thu": 5120000 },
            { name: "Tháng 5", "Doanh thu": 1100000 },
            { name: "Tháng 6", "Doanh thu": 2000000 },
            { name: "Tháng 7", "Doanh thu": 100000 },
            { name: "Tháng 8", "Doanh thu": 600000 },
            { name: "Tháng 9", "Doanh thu": 2860000 },
            { name: "Tháng 10", "Doanh thu": 1550000 },
            { name: "Tháng 11", "Doanh thu": 3750000 },
            { name: "Tháng 12", "Doanh thu": 4800000 },
        ],
    },
    {
        year: 2024,
        details: [
            { name: "Tháng 1", "Doanh thu": 1150000 },
            { name: "Tháng 2", "Doanh thu": 1700000 },
            { name: "Tháng 3", "Doanh thu": 900000 },
            { name: "Tháng 4", "Doanh thu": 1210000 },
            { name: "Tháng 5", "Doanh thu": 100000 },
            { name: "Tháng 6", "Doanh thu": 0 },
            { name: "Tháng 7", "Doanh thu": 0 },
            { name: "Tháng 8", "Doanh thu": 0 },
            { name: "Tháng 9", "Doanh thu": 0 },
            { name: "Tháng 10", "Doanh thu": 0 },
            { name: "Tháng 11", "Doanh thu": 0 },
            { name: "Tháng 12", "Doanh thu": 0 },
        ],
    },
];

const formatNumber = (value) => {
    return value.toLocaleString() + "đ";
};

const RenderLineChart = ({ year }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        for (const r of data2) {
            if (parseInt(r.year) === parseInt(year)) {
                setData(r.details);
            }
        }
    }, [year]);
    return (
        <LineChart width={1200} height={600} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatNumber} width={100} />
            <Tooltip />
            <Line dataKey="Doanh thu" fill="#82ca9d" type="monotone" stroke="#8884d8" />
            <Legend />
        </LineChart>
    );
};
export default RenderLineChart;
