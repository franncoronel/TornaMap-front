export interface IPeriod {
  id: string
  title: string
  startDate: string
  endDate: string
}

export type PeriodFormData = Omit<IPeriod, 'id'>
