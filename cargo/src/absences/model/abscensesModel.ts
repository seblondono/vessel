import { CrewId, UserId } from '../../members/model/membersModel'

export enum AbsenceType {
  SICKNESS = 'sickness',
  VACATION = 'vacation'
}

export type AbsenceDto = {
  id: number
  userId: UserId
  crewId: CrewId
  admitterId: UserId | null
  admitterNote: string
  confirmedAt: string | null
  rejectedAt: string | null
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
