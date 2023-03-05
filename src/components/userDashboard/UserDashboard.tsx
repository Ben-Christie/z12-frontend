import UserDashboardDetails from "./UserDashboardDetails";
import UserDashboardRaceResults from "./UserDashboardRaceResults";
import UserDashboardNextEvent from "./UserDashboardNextEvent";
import UserDashboardDataVisualisations from "./UserDashboardDataVisualisations";
import UserDashboardPersonalBests from "./UserDashboardPersonalBests";
import AddSessionModal from "../addSessionModal/AddSessionModal";
import UpdatePBModal from "../updatePersonalBestModal/UpdatePBModal";
import { useState, useEffect } from "react"

const UserDashboard = () => {
  const [unhideMetricModal, setUnhideMetricModal] = useState<boolean>(false);
  const [unhidePBModal, setUnhidePBModal] = useState<boolean>(true);

  useEffect(() => {

  }, [unhideMetricModal]);

  return (
    <div className="grid grid-cols-12 grid-rows-6 h-90% w-screen">
      <UserDashboardDetails />

      <UserDashboardRaceResults />

      <UserDashboardNextEvent />

      <UserDashboardDataVisualisations setOpenModal={setUnhideMetricModal} />

      <UserDashboardPersonalBests setModalState={setUnhidePBModal} />

      <AddSessionModal unhide={unhideMetricModal} setUnhide={setUnhideMetricModal} />

      <UpdatePBModal unhide={unhidePBModal} setUnhide={setUnhidePBModal} />
    </div>
  )
}

export default UserDashboard;