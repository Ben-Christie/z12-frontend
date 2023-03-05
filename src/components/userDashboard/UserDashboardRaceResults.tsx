import TableRow from "./TableRow";
import { BiRightArrow } from "react-icons/bi"
import NavigatorButton from "../buttons/NavigatorButton";
import { getRouteByTitle } from "../../utilities/appRoutes";

const UserDashboardRaceResults = () => {

  const getButtonTitle = () => {
    return (
      <div className="flex justify-center items-center">
        <p className="pr-1 m-0">View All</p> 
        <BiRightArrow />
      </div>
    )
  }

  return (
    <div className="rounded-lg p-6 mt-5 mb-5 ml-10 col-span-4 row-span-3 bg-z12-gray grid grid-rows-6">
      <div className="mb-1 flex justify-center items-center text-2xl font-bold text-white">My Race Results</div>

      <div className="row-span-4 grid grid-rows-4">
        <TableRow gridColumns="grid-cols-3" fontSize="font-semibold" textColor="text-orange-400" content={['Category', 'Position', 'Time']} />
        <TableRow gridColumns="grid-cols-3" content={['1X', '1', '06:59.02']} />
        <TableRow gridColumns="grid-cols-3" content={['2X', '3', '06:30.57']} />
        <TableRow gridColumns="grid-cols-3" content={['1X', '2', '07:03.41']} />
      </div>
      
      <div className="pt-2 mx-5">
        <NavigatorButton title={getButtonTitle()} navigateTo={'My Results'} buttonWidth="w-full" bgColor="bg-z12-gray" hoverBgColor="bg-z12-gray" hoverTextColor="hover:text-orange-400" />
      </div>
    </div>
  )
}

export default UserDashboardRaceResults;