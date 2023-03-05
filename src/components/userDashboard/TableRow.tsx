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
      elements.push(<div className={classNames('flex', 'justify-center', 'items-center', `${textSize}`, `${fontSize}`, `${textColor}`, `${bgColor}`)}>
        {content[i]}
      </div>);
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