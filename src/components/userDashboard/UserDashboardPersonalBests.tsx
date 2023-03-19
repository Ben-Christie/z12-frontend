import TableRow from "./TableRow";
import { RiSettings3Fill } from "react-icons/ri";
import AllValuesDefined from "../../utilities/AllValuesDefined";
import GetPersonalBests from "../../utilities/requests/GetPersonalBests";
import { useEffect, useState } from "react";
import GetPBRatings from "../../utilities/requests/GetPBRatings";

interface Props {
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserDashboardPersonalBests = ({setModalState}: Props) => {
  // times
  const [time100, setTime100] = useState<string>('');
  const [time500, setTime500] = useState<string>('');
  const [time1000, setTime1000] = useState<string>('');
  const [time2000, setTime2000] = useState<string>('');
  const [time6000, setTime6000] = useState<string>('');
  const [time10000, setTime10000] = useState<string>('');

  //  splits
  const [split100, setSplit100] = useState<string>('');
  const [split500, setSplit500] = useState<string>('');
  const [split1000, setSplit1000] = useState<string>('');
  const [split2000, setSplit2000] = useState<string>('');
  const [split6000, setSplit6000] = useState<string>('');
  const [split10000, setSplit10000] = useState<string>('');

  // ratings
  const [rating100, setRating100] = useState<string>('');
  const [rating500, setRating500] = useState<string>('');
  const [rating1000, setRating1000] = useState<string>('');
  const [rating2000, setRating2000] = useState<string>('');
  const [rating6000, setRating6000] = useState<string>('');
  const [rating10000, setRating10000] = useState<string>('');

  const getData = async () => {
    const response = await GetPersonalBests();

    if(!AllValuesDefined(response?.data)) {
      console.error('Error: response from function GetPersonalBests has undefined value');
    } else {
      const data = response?.data;

      // set times
      setTime100(data.pb100.time);
      setTime500(data.pb500.time);
      setTime1000(data.pb1000.time);
      setTime2000(data.pb2000.time);
      setTime6000(data.pb6000.time);
      setTime10000(data.pb10000.time);

      // set splits
      setSplit100(data.pb100.split);
      setSplit500(data.pb500.split);
      setSplit1000(data.pb1000.split);
      setSplit2000(data.pb2000.split);
      setSplit6000(data.pb6000.split);
      setSplit10000(data.pb10000.split);

    }
  }

  const getRatings = async () => {
    const response = await GetPBRatings();

    if(!AllValuesDefined(response?.data)) {
      console.error('Error: response from function GetPBRatings has undefined value');
    } else {
      const data = response?.data.myPBRatings;

      setRating100(data[0])
      setRating500(data[1])
      setRating1000(data[2])
      setRating2000(data[3])
      setRating6000(data[4])
      setRating10000(data[5])


    }
  }

  useEffect(() => {
    getData();
    getRatings();
  }, []);

  return (
    <div className="rounded-lg p-3 mt-3 mb-5 ml-8 col-span-4 row-span-3 bg-z12-gray grid grid-rows-6 content-center">
      <div className="mb-1 grid grid-cols-8 text-2xl font-bold text-white">
        <p></p>
        <p className=" col-span-6 flex justify-center items-center">My Personal Bests</p>
        <p className=" text-3xl flex justify-center items-center transition-all duration-200 ease-in-out transform hover:scale-110 hover:text-orange-400 cursor-pointer"><RiSettings3Fill onClick={() => setModalState(true)} /></p>
      </div>

      <div className="row-span-5 grid grid-rows-6">
        <TableRow gridColumns="grid-cols-4" fontSize="font-semibold" textColor="text-orange-400" content={['Distance', 'Split', 'Time', 'Rating']} />
        <div className="row-span-5 grid grid-rows-6 content-center">
          <TableRow gridColumns="grid-cols-4" content={['100m', split100, time100, rating100]} />
          <TableRow gridColumns="grid-cols-4" content={['500m', split500, time500, rating500]} />
          <TableRow gridColumns="grid-cols-4" content={['1000m', split1000, time1000, rating1000]} />
          <TableRow gridColumns="grid-cols-4" content={['2000m', split2000, time2000, rating2000]} />
          <TableRow gridColumns="grid-cols-4" content={['6000m', split6000, time6000, rating6000]} />
          <TableRow gridColumns="grid-cols-4" content={['10000m', split10000, time10000, rating10000]} />
        </div>
      </div>
    </div>
  )
}

export default UserDashboardPersonalBests;