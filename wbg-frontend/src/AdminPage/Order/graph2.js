import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
const data = [
    {
        name: "Tháng 1",
        "Đơn hàng": 8,
    },
    {
        name: "Tháng 2",
        "Đơn hàng": 10,
    },
    {
        name: "Tháng 3",
        "Đơn hàng": 15,
    },
    {
        name: "Tháng 4",
        "Đơn hàng": 2,
    },
    {
        name: "Tháng 5",
        "Đơn hàng": 11,
    },
    {
        name: "Tháng 6",
        "Đơn hàng": 13,
    },
    {
        name: "Tháng 7",
        "Đơn hàng": 9,
    },
    {
        name: "Tháng 8",
        "Đơn hàng": 20,
    },
    {
        name: "Tháng 9",
        "Đơn hàng": 3,
    },
    {
        name: "Tháng 10",
        "Đơn hàng": 5,
    },
    {
        name: "Tháng 11",
        "Đơn hàng": 7,
    },
    {
        name: "Tháng 12",
        "Đơn hàng": 1,
    },
];

const RenderBarChart = ({ width, height }) => {
    return (
        <BarChart
            width={1000}
            height={250}
            data={data}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
                dataKey="Đơn hàng"
                fill="#82ca9d"
                activeBar={<Rectangle fill="#5abfed" />}
                label={{ position: "top" }}
            />
        </BarChart>
    );
};
export default RenderBarChart;
