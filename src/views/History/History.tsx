"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import useAppointment from "@hooks/useAppointment";
import UserStore from "@store/user/user.store";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  AppointmentStatus,
  TGetAppointmentByUserUidQuery,
} from "types/appointment.type";

const HistoryView = () => {
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

  const AppointmentStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.COMPLETED:
        return (
          <p className="bg-green-500 p-1 rounded-md text-white">{status}</p>
        );
      case AppointmentStatus.CANCELLED:
        return <p className="bg-red-500 p-1 rounded-md text-white">{status}</p>;
      default:
        return (
          <p className="bg-yellow-500 p-1 rounded-md text-white">{status}</p>
        );
    }
  };

  useEffect(() => {
    if (user.uid) {
      setQuery((prev) => ({ ...prev, refUid: user.uid }));
    }
  }, [user.uid]);

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <div className="grid gap-4">
      {historyResponse?.data.items.length === 0 && (
        <div className="bg-muted rounded-md p-2 flex items-center">
          Empty data
        </div>
      )}
      <div className="grid gap-4">
        {historyResponse?.data.items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>
                {dayjs(item.appointmentDate).format("MMMM DD, YYYY")}
              </CardTitle>
              <CardDescription>Expert name: {item.expertName}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Duration {dayjs(item.startTime).format("HH:mm")} -{" "}
                {dayjs(item.endTime).format("HH:mm")}
              </p>
            </CardContent>
            <CardFooter>{AppointmentStatusBadge(item.status)}</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
