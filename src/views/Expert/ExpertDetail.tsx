"use client";

import useExpert from "@hooks/useExpert";
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import useAppointment from "@hooks/useAppointment";
import { TSearchAppointQuery } from "types/appointment.type";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button } from "@components/ui/button";
import UserStore from "@store/user/user.store";
import { useRouter } from "next/navigation";
import useUser from "@hooks/useUser";
dayjs.extend(utc);
type TExpertDetailProps = {
  id: string;
};

const ExpertDetailView = ({ id }: TExpertDetailProps) => {
  const router = useRouter();
  const { data: expertResponse, isLoading } = useExpert().getExpertById(id);
  const { user } = UserStore();
  const {
    data: userResponse,
    isLoading: userIsLoading,
    refetch: userRefetch,
  } = useUser().getUserByRefUid(user.uid);
  const [appointmentDate, setAppointDate] = useState<Date | null>(
    setHours(setMinutes(new Date(), 0), 0)
  );
  const endTime = useMemo(() => {
    if (!appointmentDate) return null;
    return setHours(
      setMinutes(appointmentDate, appointmentDate.getMinutes()),
      appointmentDate.getHours() + 1
    );
  }, [appointmentDate]);

  const [query, setQuery] = useState<TSearchAppointQuery>({
    page: 1,
    limit: 10,
    expertId: expertResponse?.data.id,
    appointmentDate: dayjs(appointmentDate).utcOffset(7).format("YYYY-MM-DD"),
  });

  const {
    data: appointmentResponse,
    isLoading: appointmentIsLoading,
    refetch: appointmentRefetch,
  } = useAppointment().searchForAppointments(query);

  const { createAppointment } = useAppointment();

  const excludeTimes = useMemo(() => {
    let tmp: string[] = [];
    appointmentResponse?.data.items.forEach((item) => {
      tmp.push(dayjs(item.startTime).utcOffset(7).format("HH:mm"));
      tmp.push(dayjs(item.endTime).utcOffset(7).format("HH:mm"));
    });
    return tmp;
  }, [appointmentResponse?.data]);

  const createAppointmentHandler = async () => {
    if (expertResponse?.data.id && appointmentDate && endTime) {
      const response = await createAppointment.mutateAsync({
        refUid: user.uid,
        expertId: expertResponse.data.id,
        appointmentDate: dayjs(appointmentDate)
          .utcOffset(7)
          .format("YYYY-MM-DD"),
        startTime: dayjs(appointmentDate).format("YYYY-MM-DD HH:mm:ss"),
        endTime: dayjs(endTime).format("YYYY-MM-DD HH:mm:ss"),
      });

      if (response.status === 201 && response.data) {
        router.push(`/history`);
      }
    }
  };

  const quotaExceeded = useMemo(() => {
    if (userResponse && userResponse?.data.company.quota <= 0) {
      return true;
    }
    return false;
  }, [userResponse?.data.company.quota]);

  useEffect(() => {
    if (query.expertId) {
      appointmentRefetch();
    }
  }, [query]);

  useEffect(() => {
    if (expertResponse?.data.id) {
      setQuery((prev) => ({
        ...prev,
        expertId: expertResponse.data.id,
      }));
    }
  }, [expertResponse?.data.id]);

  // useEffect(() => {
  //   if (user.uid) {
  //     userRefetch();
  //   }
  // }, [user.uid]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-4">
      <div className="bg-muted rounded-md p-4">
        <h4 className="text-xl text-primary font-semibold">
          {expertResponse?.data.name}
        </h4>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex incidunt
          eum vel iste quo veritatis, nihil facilis accusamus. Esse deserunt
          eligendi aut sapiente voluptate consequatur corporis sit alias
          dignissimos quod?
        </p>
      </div>
      {quotaExceeded && (
        <div className="bg-destructive text-center p-1 rounded-md text-white">
          Quota exceeded
        </div>
      )}
      <div className="bg-muted rounded-md p-4">
        <h4 className="text-xl text-primary font-semibold">
          Select a date and time
        </h4>

        <p>วันที่ต้องการนัด</p>
        <DatePicker
          disabled={quotaExceeded}
          selected={appointmentDate}
          onChange={(date) => {
            setAppointDate(date);
            setQuery((prev) => ({
              ...prev,
              appointmentDate: dayjs(date).utcOffset(7).format("YYYY-MM-DD"),
            }));
          }}
        />

        <p>เวลาที่ต้องการนัด ตั้งแต่</p>
        <DatePicker
          disabled={quotaExceeded}
          selected={appointmentDate}
          onChange={(date) => setAppointDate(date)}
          showTimeSelect
          showTimeSelectOnly
          minTime={setHours(setMinutes(new Date(), 0), 6)}
          maxTime={setHours(setMinutes(new Date(), 30), 18)}
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="h:mm aa"
          excludeTimes={excludeTimes.map((time) => {
            const [hours, minutes] = time.split(":");
            const value = setHours(
              setMinutes(new Date(), parseInt(minutes)),
              parseInt(hours)
            );
            return value;
          })}
        />

        <p>ถึง</p>
        <DatePicker
          selected={endTime}
          onChange={(date) => setAppointDate(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="h:mm aa"
          disabled
        />

        <Button
          disabled={quotaExceeded}
          onClick={() => createAppointmentHandler()}
        >
          Appointment
        </Button>
      </div>
    </div>
  );
};

export default ExpertDetailView;
