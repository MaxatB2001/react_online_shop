import classes from "./Chart.module.scss"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({data, title}) => {
    return (
        <div className={classes.chart}>
            <h3 className={classes.chart__title}>{title}</h3>
            <ResponsiveContainer width={"100%"} aspect={4/1}>
                <LineChart data={data}>
                    <XAxis dataKey="date" stroke="#444"/>
                    <YAxis stroke="#444"/>
                    <Line type="monotone" dataKey="orders"/>
                    <Tooltip/>
                    <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;