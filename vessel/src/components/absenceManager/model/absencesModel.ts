export enum AbsenceType {
  SICKNESS = 'sickness',
  VACATION = 'vacation',
}

export const AbsenceFilterByType = {
  SICKNESS: 'sickness',
  VACATION: 'vacation',
  NONE: 'none',
}

export type AbsenceFilterType = typeof AbsenceFilterByType[keyof typeof AbsenceFilterByType]

export enum AbsenceStatus {
  REQUESTED = 'REQUESTED',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
}

export type AbsenceListItemDto = {
  id: number
  userName: string
  type: AbsenceType
  endDate: string
  startDate: string
  memberNote?: string
  admitterNote?: string
  status: AbsenceStatus
}
