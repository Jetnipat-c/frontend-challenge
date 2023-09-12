import React from "react";
import Upcoming from "./components/Upcoming";
import Expert from "./components/Expert";

const AppointmentView = () => {
  return (
    <div className="grid gap-4">
      <Upcoming />
      <Expert />
    </div>
  );
};

export default AppointmentView;
