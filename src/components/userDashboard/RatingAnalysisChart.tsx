import { AreaChart, Area, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { generateMetricSelectorButton } from '../../utilities/generateMetricSelectorButton';

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
          <AreaChart data={data} margin={{top: 20, right: 20, left: 0, bottom: 10}}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis>
              <Label value="Number of Athletes" position="left" fill="#fb923c" fontWeight="bold" angle={270} dy={-70} offset={-20} />
            </YAxis>
            <Tooltip />
            <Area type="monotone" dataKey="athletes" stroke="#ffff" fill="#fb923c" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RatingAnalysis;