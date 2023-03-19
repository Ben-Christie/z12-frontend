import { generateMetricSelectorButton } from '../../utilities/generateMetricSelectorButton';
import { useEffect, useState } from "react";
import AllValuesDefined from '../../utilities/AllValuesDefined';
import GetSAndCChartData from '../../utilities/requests/GetSAndCChartData';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

interface SessionData {
  exercise: string;
  weight: number;
  reps: number;
  date: string;
}

const SandCAnalysis = () => {
  const [exerciseSelected, setExerciseSelected] = useState<string>('Bench Press');
  const [sessionDataPoints, setSessionDataPoints] = useState<SessionData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    const response = await GetSAndCChartData(exerciseSelected);

    if(!AllValuesDefined(response?.data)) {
      console.error('Error: response from function GetSAndCChartData has undefined value');
    } else {
      const data = response?.data;

      setSessionDataPoints(data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getData();
    console.log(sessionDataPoints)
  }, [exerciseSelected]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setSessionDataPoints([])
        setIsLoading(false);
      }
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: ((tooltipItem: any) => {
            console.log(tooltipItem)
          })
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Reps',
          color: 'white'
        },
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'white'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Weight',
          color: 'white'
        },
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'white'
        }
      },
    },  
  };

  const createDataArray = () => {
    return sessionDataPoints.map((dataPoint) => ({
      x: dataPoint.reps,
      y: dataPoint.weight
    }))
  }


  const data = {
    datasets: [
      {
        data: createDataArray(),
        backgroundColor: '#fb923c',
      },
    ],
  };

  return (
    <div className="border-white border-2 rounded-lg row-span-5 w-full grid grid-cols-12 grid-rows-6">
      <div className="border-white border-r-2 col-span-2 row-span-6 grid grid-rows-6">
        {generateMetricSelectorButton('Bench Press', setExerciseSelected)}
        {generateMetricSelectorButton('Bicep Curls', setExerciseSelected)}
        {generateMetricSelectorButton('Deadlift', setExerciseSelected)}
        {generateMetricSelectorButton('Squats', setExerciseSelected)}
      </div>

      <div className=" col-span-10 row-span-6 p-5">
        {isLoading ? (<p className="text-white">Loading...</p>) : ((sessionDataPoints.length > 0) ? <Scatter options={options} data={data} /> : <p className="flex justify-center text-red-700">No data available</p>)}
      </div>

    </div>
  )
}

export default SandCAnalysis;