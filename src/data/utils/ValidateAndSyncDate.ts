import { isBefore } from 'date-fns/isBefore'
import { isAfter } from 'date-fns/isAfter'

type ValidatedDates = {
  startDate: Date
  endDate: Date
}

export function validateAndSyncDates(
  startDate: Date,
  endDate: Date
): ValidatedDates {
  if (isAfter(startDate, endDate)) {
    return { startDate, endDate: new Date(startDate) }
  }

  if (isBefore(endDate, startDate)) {
    return { startDate: new Date(endDate), endDate }
  }

  return { startDate, endDate }
}
