import { CrewId, UserId } from '../../members/model/membersModel'
import { isValue } from '../../util/typeGuardUtil'
import { AbsenceDto, AbsenceStatus, AbsenceType } from './abscensesModel'

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

  constructor(absence: AbsenceDto) {
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

  static getStatus(absence: AbsenceDto): AbsenceStatus {
    if (isValue(absence.rejectedAt)) return AbsenceStatus.REJECTED
    if (isValue(absence.confirmedAt)) return AbsenceStatus.CONFIRMED
    return AbsenceStatus.REQUESTED
  }
}

export default Absence
