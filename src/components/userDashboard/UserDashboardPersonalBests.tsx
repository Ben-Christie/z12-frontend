import TableRow from "./TableRow";
import { RiSettings3Fill } from "react-icons/ri";

interface Props {
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserDashboardPersonalBests = ({setModalState}: Props) => {
  return (
    <div className="rounded-lg p-6 mt-5 mb-5 ml-10 col-span-4 row-span-3 bg-z12-gray grid grid-rows-6">
      <div className="mb-1 grid grid-cols-8 text-2xl font-bold text-white">
        <p></p>
        <p className=" col-span-6 flex justify-center items-center">My Personal Bests</p>
        <p className=" text-3xl flex justify-center items-center transition-all duration-200 ease-in-out transform hover:scale-110 hover:text-orange-400 cursor-pointer"><RiSettings3Fill onClick={() => setModalState(true)} /></p>
      </div>

      <div className="row-span-5 grid grid-rows-6">
        <TableRow gridColumns="grid-cols-3" fontSize="font-semibold" textColor="text-orange-400" content={['Distance', 'Split', 'Time']} />
        <div className="row-span-5 grid grid-rows-6">
          <TableRow gridColumns="grid-cols-3" content={['100m', '01:22.00', '15.46']} />
          <TableRow gridColumns="grid-cols-3" content={['500m', '01:27.00', '01:27.00']} />
          <TableRow gridColumns="grid-cols-3" content={['1000m', '01:40.00', '03:30.76']} />
          <TableRow gridColumns="grid-cols-3" content={['2000m', '01:43.00', '06:55.30']} />
          <TableRow gridColumns="grid-cols-3" content={['6000m', '01:50.00', '20:43.98']} />
          <TableRow gridColumns="grid-cols-3" content={['10000m', '01:52.00', '37:20.02']} />
        </div>
      </div>
    </div>
  )
}

export default UserDashboardPersonalBests;