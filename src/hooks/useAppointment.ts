/* eslint-disable react-hooks/rules-of-hooks */
import appointmentService from "@services/appointment.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  TCreateAppointmentRequest,
  TGetAppointmentByUserUidQuery,
  TSearchAppointQuery,
} from "types/appointment.type";

const useAppointment = () => {
  const searchForAppointments = (query: TSearchAppointQuery) => {
    const response = useQuery({
      queryKey: ["appointment", query],
      queryFn: () => appointmentService.searchForAppointments(query),
      enabled: false,
      retry: false,
    });

    return response;
  };

  const createAppointment = useMutation({
    mutationFn: (body: TCreateAppointmentRequest) => {
      const data = appointmentService.createAppointment(body);
      return data;
    },
  });

  const getAppointmentByUserUid = (query: TGetAppointmentByUserUidQuery) => {
    console.log("query", query);
    const response = useQuery({
      queryKey: ["history", query.refUid],
      queryFn: () => appointmentService.getAppointmentByUserUid(query),
      enabled: !!query.refUid,
      retry: false,
    });

    return response;
  };

  return { searchForAppointments, createAppointment, getAppointmentByUserUid };
};

export default useAppointment;
