import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    date: '01/01/23',
    time: 104.6
  },
  {
    date: '05/01/23',
    time: 114.6
  },
  {
    date: '07/01/23',
    time: 110.3
  },
  {
    date: '15/01/23',
    time: 103.2
  },
];

const ErgAnalysis = () => {
  return (
    <ResponsiveContainer width="100%" height="95%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <Line type="monotone" dataKey="time" stroke="#fb923c" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default ErgAnalysis;