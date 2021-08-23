import { CrewId, UserId } from '../../members/model/membersModel'

export enum AbsenceType {
  SICKNESS = 'sickness',
  VACATION = 'vacation'
}

export type AbsenceEntity = {
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