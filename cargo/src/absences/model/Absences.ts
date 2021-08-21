import Members from '../../members/model/Members'
import { isValue } from '../../util/typeGuardUtil'
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
    return this.items.map((it: Absence) => {
      const userName = members.getById(it.userId)?.name

      if (!isValue(userName)) {
        throw new Error(`User with id ${it.userId} could not be found.`)
      }

      return {
        id: it.id,
        userName,
        type: it.type,
        endDate: it.endDate,
        startDate: it.startDate,
        memberNote: it.memberNote,
        admitterNote: it.admitterNote,
        status: it.status,
      }
    })
  }
}

export default Absences
