import { isValue } from '../../../util/typeGuardUtil'
import MemberRepository from '../../members/model/MemberRepository'
import { CrewId, UserId } from '../../members/model/membersModel'
import { AbsenceEntity, AbsenceListItemDto, AbsenceStatus, AbsenceType } from './abscensesModel'

class Absence {
  public id: number
  public userId: UserId
  public crewId: CrewId
  public admitterId: UserId | null
  public admitterNote: string
  public confirmedAt: string | null
  public rejectedAt: string | null
  public createdAt: string
  public endDate: string
  public startDate: string
  public memberNote: string
  public type: AbsenceType
  public status: AbsenceStatus

  constructor(absence: AbsenceEntity) {
    this.id = absence.id
    this.userId = absence.userId
    this.crewId = absence.crewId
    this.admitterId = absence.admitterId
    this.admitterNote = absence.admitterNote
    this.confirmedAt = absence.confirmedAt
    this.rejectedAt = absence.rejectedAt
    this.createdAt = absence.createdAt
    this.endDate = absence.endDate
    this.startDate = absence.startDate
    this.memberNote = absence.memberNote
    this.type = absence.type
    this.status = Absence.getStatus(absence)
  }

  static getStatus(absence: AbsenceEntity): AbsenceStatus {
    if (isValue(absence.rejectedAt)) return AbsenceStatus.REJECTED
    if (isValue(absence.confirmedAt)) return AbsenceStatus.CONFIRMED
    return AbsenceStatus.REQUESTED
  }

  public toAbsenceListItemDto(members: MemberRepository): AbsenceListItemDto {
    const userName = members.getById(this.userId)?.name

    if (!isValue(userName)) {
      throw new Error(`User with id ${this.userId} could not be found.`)
    }

    return {
      id: this.id,
      userName,
      type: this.type,
      endDate: this.endDate,
      startDate: this.startDate,
      memberNote: this.memberNote,
      admitterNote: this.admitterNote,
      status: this.status,
    }
  }

  public toAbsenceEntity(): AbsenceEntity {
    return {
      id: this.id,
      userId: this.userId,
      crewId: this.crewId,
      admitterId: this.admitterId,
      admitterNote: this.admitterNote,
      confirmedAt: this.confirmedAt,
      rejectedAt: this.rejectedAt,
      createdAt: this.createdAt,
      endDate: this.endDate,
      startDate: this.startDate,
      memberNote: this.memberNote,
      type: this.type,
    }
  }
}

export default Absence
