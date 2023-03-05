import classNames from "classnames"

export const generateMetricSelectorButton = (title: string): JSX.Element => {
  return (
    <button className={classNames('py-2', 'px-4', 'text-lg', 'rounded-lg', 'text-white', 'font-semibold', 'transition-all', 'duration-200', 'ease-in-out', 'transform', 'hover:scale-110', 'hover:bg-orange-400', 'active:bg-orange-400', 'mx-3', 'h-10', 'flex', 'justify-center', 'items-center', 'mt-1.5')}>
      {title}
    </button>
  )
}

 