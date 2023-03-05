import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

const data = [
  {
    split: '2:00',
    athletes: 0
  },
  {
    split: '1:50',
    athletes: 5
  },
  {
    split: '1:40',
    athletes: 18
  },
  {
    split: '1:30',
    athletes: 30
  },
  {
    split: '1:20',
    athletes: 18
  },
  {
    split: '1:10',
    athletes: 5
  },
  {
    split: '1:00',
    athletes: 0
  }
];


const RatingAnalysis = () => {
  return (
    <ResponsiveContainer width="100%" height="95%">
      <AreaChart data={data} margin={{top: 20, right: 20, left: 0, bottom: 10}}>
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis>
          <Label value="Number of Athletes" position="left" fill="#fb923c" fontWeight="bold" angle={270} dy={-70} offset={-20} />
        </YAxis>
        <Tooltip />
        <Area type="monotone" dataKey="athletes" stroke="#ffff" fill="#fb923c" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default RatingAnalysis;