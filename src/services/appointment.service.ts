import httpClient from "@utils/httpClient";
import { AxiosResponse } from "axios";
import {
  TAppointment,
  TCreateAppointmentRequest,
  TGetAppointmentByUserUidQuery,
  TSearchAppointQuery,
} from "types/appointment.type";
import { TPaginateResponse } from "types/pagination.type";

const searchForAppointments = async (
  query: TSearchAppointQuery
): Promise<AxiosResponse<TPaginateResponse<TAppointment>>> => {
  const path = `/v1/appointments`;
  return await httpClient().get(path, { params: query });
};

const createAppointment = async (
  body: TCreateAppointmentRequest
): Promise<AxiosResponse<TAppointment>> => {
  const path = `/v1/appointments`;
  return await httpClient().post(path, body);
};

const getAppointmentByUserUid = async (
  query: TGetAppointmentByUserUidQuery
): Promise<AxiosResponse<TPaginateResponse<TAppointment>>> => {
  const path = `/v1/appointments/history`;
  return await httpClient().get(path, { params: query });
};

const appointmentService = {
  searchForAppointments,
  createAppointment,
  getAppointmentByUserUid,
};

export default appointmentService;
