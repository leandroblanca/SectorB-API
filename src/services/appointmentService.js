import Appointment from "../models/appointment.js";
import { appointment_duration, booking_time, timeToMinutes } from "../utils/appointmentUtil.js";

async function getAvailableTimes(barberId, dayStart) {
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
  const appointments = await Appointment.find({
    date: {
      $gte: dayStart,
      $lt: dayEnd,
    },
    status: {
        $nin: ["cancelled", "rejected"],
    },
  }).select("barber time duration")

  if (appointments.length >= 20) {
    return [];
  }
  const barberAppointments = appointments.filter(
    (appointment) => appointment.barber.toHexString() === barberId.toString()
  )
  const now = new Date();

  return booking_time.filter((time) => {
    const start= timeToMinutes(time)
    const end = start + appointment_duration


   const appointmentDate = new Date(
      dayStart.getTime() + start * 60000
    );

    if (appointmentDate <= now) {
      return false;
    }

    const isOccupied = barberAppointments.some((appointment) => {
      const existingStart = timeToMinutes(appointment.time);

      const existingEnd =
        existingStart + appointment.duration;

      return start < existingEnd && end > existingStart;
    });

    return !isOccupied;
  });
}
export {getAvailableTimes};