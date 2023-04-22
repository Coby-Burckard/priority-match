/*
  Should be able to 
  - add new schedule
  - click list of existing schedules
*/

import { AddSchedule } from "~/components/schedule/AddSchedule";
import ListSchedules from "~/components/schedule/ListSchedules";

const ScheduleWrapper = () => {
  return (
    <section>
      <AddSchedule />
      <ListSchedules />
    </section>
  );
};

export default ScheduleWrapper;
