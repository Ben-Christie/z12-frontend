import classNames from "classnames";

interface Props {
  gridColumns: string;
  textSize?: string;
  fontSize?: string;
  textColor?: string;
  bgColor?: string;
  content: string[];
}

const TableRow = ({gridColumns, textSize = 'text-lg', fontSize, textColor = 'text-white', bgColor, content}: Props) => {

  const getNumberOfColumns = (cols : string): number => {
    return Number(cols.split('-')[2])
  }

  const generateRows = (numberOfCols: number, array: string[]): JSX.Element[] => {
    const elements = [];
    
    for(let i = 0; i < numberOfCols; i++) {
      if(i !== numberOfCols - 1) {
        elements.push(<div className={classNames('flex', 'justify-center', 'items-center', `${textSize}`, `${fontSize}`, `${textColor}`, `${bgColor}`)}>
          {content[i]}
        </div>);
      } else {
        const val = content[i];
        let ratingColor = 'text-orange-400'
        const numericPattern: RegExp = /^[0-9]+$/;
        const timePattern: RegExp = /^[0-9:.]+$/;
        
        // check if value only contains numeric values
        if(numericPattern.test(val)) {
          const num = parseInt(val);

          if(num >= 90) {
            ratingColor = 'text-purple-400'
          } else if(num < 90 && num >= 70) {
            ratingColor = 'text-green-400'
          } else if(num < 40 && num >= 1) {
            ratingColor = 'text-red-400'
          } else if(num === 0) {
            ratingColor = 'text-white'
          }
        } else if(timePattern.test(val)) {
          ratingColor = 'text-white'
        }

        elements.push(<div className={classNames(
          'flex', 
          'justify-center', 
          'items-center', 
          'font-semibold', 
          `${textSize}`, 
          `${bgColor}`,
          `${ratingColor}`
          )}>
          {content[i]}
        </div>);
      }
    }

    return elements;
  }

  return (
    <div className={classNames('rounded-lg', 'my-1', 'border-2', 'grid', `${gridColumns}`, 'content-center')}>
      {generateRows(getNumberOfColumns(gridColumns), content)}
    </div>
  )
}

export default TableRow;