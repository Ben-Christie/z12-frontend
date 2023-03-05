import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { generateMetricSelectorButton } from '../../utilities/generateMetricSelectorButton';

const data = [
  { rep: 10, weight: 65 },
  { rep: 12, weight: 60 },
  { rep: 10, weight: 70 },
  { rep: 8, weight: 80 },
  { rep: 6, weight: 100 },
  { rep: 11, weight: 55 },
];

const SandCAnalysis = () => {
  return (
    <div className="border-white border-2 rounded-lg row-span-5 w-full grid grid-cols-12">
      <div className="border-white border-r-2 col-span-2 grid grid-rows-5">
        {generateMetricSelectorButton('Bench Press')}
        {generateMetricSelectorButton('Bicep Curls')}
        {generateMetricSelectorButton('Deadlift')}
        {generateMetricSelectorButton('Squats')}
      </div>

      <div className=" col-span-10">
        <ResponsiveContainer width="100%" height="95%">
          <ScatterChart
            margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <CartesianGrid />
            <XAxis type="number" dataKey="rep" name="reps" tick={{ fill: 'white' }} domain={['auto', 'auto']}>
              <Label value="Reps" position="bottom" fill="#fb923c" fontWeight="bold" />
            </XAxis>
            <YAxis type="number" dataKey="weight" name="weight" tick={{ fill: 'white' }} domain={['auto', 'auto']}>
              <Label value="Weight (kg)" position="left" fill="#fb923c" fontWeight="bold" angle={270} dy={-40} offset={-10} />
            </YAxis>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={data} fill="#fb923c" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default SandCAnalysis;