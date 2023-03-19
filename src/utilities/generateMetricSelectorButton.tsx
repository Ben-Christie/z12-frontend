import classNames from "classnames"

export const generateMetricSelectorButton = (title: string, setState: React.Dispatch<React.SetStateAction<string>>): JSX.Element => {

  const param = title.replace(' ', '%20');

  return (
    <button onClick={() => setState(param)} className={classNames('py-2', 'px-4', 'text-lg', 'rounded-lg', 'text-white', 'font-semibold', 'transition-all', 'duration-200', 'ease-in-out', 'transform', 'hover:scale-110', 'hover:bg-orange-400', 'focus:bg-orange-400', 'mx-3', 'h-10', 'flex', 'justify-center', 'items-center', 'mt-1')}>
      {title}
    </button>
  )
}

 