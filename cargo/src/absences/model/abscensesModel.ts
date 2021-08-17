export enum AbsenceType {
  SICKNESS = 'sickness',
  VACATION = 'vacation'
}

export type AbsenceDto = {
  id: number
  userId: number
  crewId: number
  admitterId?: number
  admitterNote: string
  confirmedAt?: string
  rejectedAt?: string
  createdAt: string
  endDate: string
  startDate: string
  memberNote: string
  type: AbsenceType
}

export type AbsencesResponseDto = {
  message: string
  payload: AbsenceDto[]
}
