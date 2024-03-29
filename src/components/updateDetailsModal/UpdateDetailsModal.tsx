import UpdateDetailsModalContainer from "./UpdateDetailsModalContainer";
import classNames from "classnames";

interface Props {
  unhide: boolean;
  setUnhide: React.Dispatch<React.SetStateAction<boolean>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateDetailsModal = ({unhide, setUnhide, setRefresh}: Props) => {
  return (
    <div className={classNames(
      'fixed', 
      'inset-0', 
      'z-50', 
      'flex', 
      'justify-center', 
      'items-center', 
      {'hidden' : unhide === false}
    )}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <UpdateDetailsModalContainer setUnhide={setUnhide} setRefresh={setRefresh} />
    </div>
  )
}

export default UpdateDetailsModal;