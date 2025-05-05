// Esta función valida y sincroniza dos fechas, asegurando que la fecha de inicio no sea posterior a la fecha de finalización y viceversa.
import { Moment } from 'moment'

type ValidatedDates = {
  startDate: Moment
  endDate: Moment
}

export function validateAndSyncDates(
  startDate: Moment,
  endDate: Moment
): ValidatedDates {
  if (startDate.isAfter(endDate)) {
    return { startDate, endDate: startDate.clone() }
  }

  if (endDate.isBefore(startDate)) {
    return { startDate: endDate.clone(), endDate }
  }

  return { startDate, endDate }
}
