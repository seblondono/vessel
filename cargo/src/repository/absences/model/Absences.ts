import Members from '../../members/model/Members'
import { AbsenceDto, AbsenceListDto } from './abscensesModel'
import Absence from './Absence'

class Absences {
  public items: Absence[]

  constructor(absences: AbsenceDto[]) {
    this.items = absences.map((it) => new Absence(it))
  }

  public getById(absenceId: number): Absence | undefined {
    return this.items.find((it) => it.id === absenceId)
  }

  public toAbsenceListDto(members: Members): AbsenceListDto {
    return this.items.map((it: Absence) => it.toAbsenceListItem(members))
  }
}

export default Absences
