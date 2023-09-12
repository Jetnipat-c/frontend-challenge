import { type } from "os";
import { TPaginateOptions } from "./pagination.type";

export type TSearchAppointQuery = TPaginateOptions & {
  expertId?: string;
  appointmentDate?: string;
};

export type TAppointment = {
  id: string;
  createdAt: string;
  updatedAt: string;
  refUid: string;
  employeeName: string;
  expertId: string;
  expertName: string;
  companyId: string;
  companyName: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
};

export type TCreateAppointmentRequest = {
  refUid: string;
  expertId: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
};

export type TGetAppointmentByUserUidQuery = TPaginateOptions & {
  refUid: string;
};

export enum AppointmentStatus {
  WAITING = "waiting",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}
