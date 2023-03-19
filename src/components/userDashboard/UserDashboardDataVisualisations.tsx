import { TiPlusOutline } from "react-icons/ti";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import SandCAnalysis from "./SandCAnalysisChart";
import ErgAnalysis from "./ErgAnalysisChart";
import { useState } from "react";

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserDashboardDataVisualisations = ({setOpenModal}: Props) => {
  const navigate = useNavigate()

  const setChartState = (chart: string) => {
    switch (chart) {
      case 'erg':
        setOpenErgAnalysis(true);
        setOpenSAndCAnalysis(false);
        break;
      case 'sAndC':
        setOpenErgAnalysis(false);
        setOpenSAndCAnalysis(true);
        break;
    }
  }
  
  const generateChartTab = (title: string, openChart: string, marginR?: string) => {
    return (
      <button type="button" onClick={() => setChartState(openChart)} className={classNames('border-2', 'py-1', 'px-4', 'text-lg', 'rounded-lg', 'text-white', 'font-semibold', 'transition-all', 'duration-200', 'ease-in-out', 'transform', 'hover:scale-110', 'hover:bg-orange-400', `${marginR}`, 'focus:bg-orange-400')}>{title}
      </button>
    )
  }

  const [openErgAnalysis, setOpenErgAnalysis] = useState<boolean>(true);
  const [openSAndCAnalysis, setOpenSAndCAnalysis] = useState<boolean>(false);
  
  return (
    <div className="rounded-lg p-3 mb-5 col-span-8 row-span-3 bg-z12-gray grid grid-rows-6">
      
      <div className="mb-1 grid grid-cols-12">
        <div className="col-span-11 flex items-center">
          {generateChartTab('Erg Analysis', 'erg', 'mr-3')}
          {generateChartTab('S&C Analysis', 'sAndC')}
        </div>

        <div className="text-3xl flex justify-center items-center transition-all duration-200 ease-in-out transform hover:scale-110 hover:text-orange-400 cursor-pointer text-white">
          <TiPlusOutline onClick={() => setOpenModal(true)} />
        </div>
      </div>

      {openErgAnalysis && <ErgAnalysis />}
      {openSAndCAnalysis && <SandCAnalysis />}
      
    </div>
  )
}

export default UserDashboardDataVisualisations;