import classNames from "classnames"

const UserDashboardNextEvent = () => {
  const initialiseColumn = (text: string, textColor: string, colspan?: string, boldFont?: string, borderR?: string) => {
    return (
      <div className={classNames('text-lg', `${textColor}`, 'flex', 'justify-center', 'items-center', `${boldFont}`, `${colspan}`, `${borderR}`)}>{text}</div>
    )
  }

  return (
    <div className="rounded-lg p-6 mt-5 mb-5 col-span-8 bg-z12-gray flex justify-center items-center">
      <div className="border-2 grid grid-cols-4 w-full h-full rounded-lg">
        {initialiseColumn('My Next Event', 'text-orange-400', undefined, 'font-semibold', 'border-r-2')}
        {initialiseColumn('Z12 Performance Regional Event', 'text-white', 'col-span-2', undefined, 'border-r-2')}
        {initialiseColumn('04/03/2023','text-white')}
      </div>
    </div>
  )
}

export default UserDashboardNextEvent;