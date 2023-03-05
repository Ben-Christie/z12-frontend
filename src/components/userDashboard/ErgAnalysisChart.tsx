import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer } from 'recharts';
import { generateMetricSelectorButton } from '../../utilities/generateMetricSelectorButton';

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
    <div className="border-white border-2 rounded-lg row-span-5 w-full grid grid-cols-12 grid-rows-6">
      <div className="border-white border-r-2 col-span-2 row-span-6 grid grid-rows-6">
        {generateMetricSelectorButton('100m')}
        {generateMetricSelectorButton('500m')}
        {generateMetricSelectorButton('1000m')}
        {generateMetricSelectorButton('2000m')}
        {generateMetricSelectorButton('6000m')}
        {generateMetricSelectorButton('10000m')}
      </div>

      <div className=" col-span-10 row-span-6">
        <ResponsiveContainer width="100%" height="95%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 40,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={{ fill: 'white' }} dataKey="date" />
            <YAxis tick={{ fill: 'white' }} domain={['auto', 'auto']}>
              <Label value="Time (seconds)" position="left" fill="#fb923c" fontWeight="bold" angle={270} dy={-60} offset={-10} />
            </YAxis>
            <Tooltip />
            <Line type="monotone" dataKey="time" stroke="#fb923c" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ErgAnalysis;