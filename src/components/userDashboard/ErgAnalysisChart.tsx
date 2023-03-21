import { generateMetricSelectorButton } from '../../utilities/generateMetricSelectorButton';
import GetErgChartData from '../../utilities/requests/GetErgChartData';
import AllValuesDefined from '../../utilities/AllValuesDefined';
import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

interface SessionData {
  distance: string;
  strokes_per_minute: number;
  split_500m: string;
  time: string;
  time_in_seconds: number;
  intensity_percentage: number;
  date: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

const ErgAnalysis = () => {
  const [distanceSelected, setDistanceSelected] = useState<string>('500m');
  const [sessionDataPoints, setSessionDataPoints] = useState<SessionData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    const response = await GetErgChartData(distanceSelected);

    if(!AllValuesDefined(response?.data)) {
      console.error('Error: response from function GetErgChartData has undefined value');
    } else {
      const data = response?.data;

      setSessionDataPoints(data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, [distanceSelected]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setSessionDataPoints([])
        setIsLoading(false);
      }
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: ((tooltipItem: any) => {
            return `${sessionDataPoints[tooltipItem.dataIndex].time} (Intensity: ${sessionDataPoints[tooltipItem.dataIndex].intensity_percentage}%)`
          })
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date of Session',
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
          text: 'Time',
          color: 'white'
        },
        ticks: {
          color: 'white',
          callback: function(tickValue: string | number) {
            const value = typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue;
            // convert to minutes and seconds
            const minutes = Math.floor(value / 60);
            const seconds = value % 60;

            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
          }
        },
        grid: {
          color: 'white'
        }
      },
    },  
  };


  const data = {
    labels: sessionDataPoints.map((point) => point.date),
    datasets: [
      {
        data: sessionDataPoints.map((point) => point.time_in_seconds),
        borderColor: '#fb923c',
        backgroundColor: '#000',
        tension: 0.2,
        pointRadius: 5,
        pointHoverRadius: 6
      },
    ],
  };

  return (
    <div className="border-white border-2 rounded-lg row-span-5 w-full grid grid-cols-12 grid-rows-6">
      <div className="border-white border-r-2 col-span-2 row-span-6 grid grid-rows-6">
        {generateMetricSelectorButton('100m', setDistanceSelected)}
        {generateMetricSelectorButton('500m', setDistanceSelected)}
        {generateMetricSelectorButton('1000m', setDistanceSelected)}
        {generateMetricSelectorButton('2000m', setDistanceSelected)}
        {generateMetricSelectorButton('6000m', setDistanceSelected)}
        {generateMetricSelectorButton('10000m', setDistanceSelected)}
      </div>

      <div className="col-span-10 row-span-6 p-5">
        {isLoading ? (<p className="text-white">Loading...</p>) : ((sessionDataPoints.length > 0) ? <Line options={options} data={data} /> : <p className="flex justify-center text-red-700">No data available</p>)}
      </div>

    </div>
  )
}

export default ErgAnalysis;