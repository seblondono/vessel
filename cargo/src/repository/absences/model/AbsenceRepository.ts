import MemberRepository from '../../members/model/MemberRepository'
import { AbsenceEntity, AbsenceListDto } from './abscensesModel'
import Absence from './Absence'

class AbsenceRepository {
  public items: Absence[]

  constructor(absences: AbsenceEntity[]) {
    this.items = absences.map((it) => new Absence(it))
  }

  public getById(absenceId: number): Absence | undefined {
    return this.items.find((it) => it.id === absenceId)
  }

  public toAbsenceListDto(members: MemberRepository): AbsenceListDto {
    return this.items.map((it: Absence) => it.toAbsenceListItemDto(members))
  }
}

export default AbsenceRepository
