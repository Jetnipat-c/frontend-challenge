"use client";

import useAppointment from "@hooks/useAppointment";
import UserStore from "@store/user/user.store";
import dayjs from "dayjs";
import { CalendarDaysIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AppointmentStatus,
  TGetAppointmentByUserUidQuery,
} from "types/appointment.type";

const Upcoming = () => {
  const { user } = UserStore();
  const [query, setQuery] = useState<TGetAppointmentByUserUidQuery>({
    refUid: user.uid,
    page: 1,
    limit: 10,
  });
  const {
    data: historyResponse,
    isLoading,
    refetch,
  } = useAppointment().getAppointmentByUserUid(query);

  useEffect(() => {
    if (user.uid) {
      setQuery((prev) => ({ ...prev, refUid: user.uid }));
    }
  }, [user.uid]);

  useEffect(() => {
    refetch();
  }, [query]);

  if (historyResponse?.data.items[0]?.status === AppointmentStatus.WAITING) {
    return (
      <div className="bg-muted rounded-md p-2 flex items-center">
        <CalendarDaysIcon className="w-6 h-6 text-yellow-500 mr-2" />
        <p className="text-sm">
          {` Appointment upcoming on: ${dayjs(
            historyResponse?.data.items[0].appointmentDate
          ).format("MMMM DD, YYYY")}  Duration ${dayjs(
            historyResponse?.data.items[0].startTime
          ).format("HH:mm")} -
          ${dayjs(historyResponse?.data.items[0].endTime).format("HH:mm")}`}
        </p>
      </div>
    );
  }

  return null;
};

export default Upcoming;
