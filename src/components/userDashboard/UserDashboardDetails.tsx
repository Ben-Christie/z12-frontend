import TableRow from "./TableRow";
import classNames from "classnames";

const UserDashboardDetails = () => {
  const userDetail = (title: string, value: string, divSize: string, borderBT?: string, borderR?: string) => {
    return (
      <div className={classNames('border-white', `${borderR}`, `${borderBT}`, 'text-lg', 'flex', 'items-center', 'pl-5', 'py-1', `${divSize}`)}>
        <p className="pr-3 font-semibold text-orange-400">{title} :</p>
        <p className="text-white">{value}</p>
      </div>
    )
  }

  const unpackDetailArrays = (title: string, array: string[]): JSX.Element => {
    let result = ''

    for(let i = 0; i < array.length; i++) {
      if(array.length - 1 === i) {
        result += array[i]
      } else {
        result += `${array[i]} / `
      }
    }
    
    return (
      <div className="border-2 rounded-lg col-span-9 row-span-1 ml-2 grid grid-cols-4 mt-1 content-center">
        <div className="border-white border-r-2 text-lg text-orange-400 font-semibold flex justify-center items-center">{title}</div>
        <div className="col-span-3 text-lg flex justify-center items-center text-white">{result}</div>
      </div>
    )
  }


  return (
    <div className="rounded-lg p-3 mt-5 col-span-8 row-span-2 bg-z12-gray grid grid-cols-11 grid-rows-5">
      <div className="rounded-lg border-2 row-span-5 col-span-2 mr-2"></div>

      <div className="border-2 rounded-lg row-span-3 col-span-9 ml-2 grid grid-cols-6 grid-rows-3 mb-1">
        {userDetail('Name', "John Doe", 'col-span-3', 'border-b-2', 'border-r-2')}
        {userDetail('Weight', '75 kg', 'col-span-3', 'border-b-2')}
        {userDetail('Age', '17 (03/04/2005)', 'col-span-3', 'border-b-2', 'border-r-2')}
        {userDetail('Height', '185 cm', 'col-span-3', 'border-b-2')}
        {userDetail('Category', 'J18 Men (80kg)', 'col-span-3', undefined, 'border-r-2')}
        {userDetail('Wingspan', '187 cm', 'col-span-3')}
      </div>

      {unpackDetailArrays('My Club', ['Castleconnell BC', 'ULRC'])}
      {unpackDetailArrays('My Coaches', ['John Smith', 'Michael Simpson'])}
      
    </div>
  )
}

export default UserDashboardDetails;