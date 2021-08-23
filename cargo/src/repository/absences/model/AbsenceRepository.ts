import { PaginatedResult } from '../../../controller/model/paginatedResult'
import paginateCollection from '../../../util/paginateCollection'
import MemberRepository from '../../members/model/MemberRepository'
import { AbsenceEntity, AbsenceListItemDto } from './abscensesModel'
import Absence from './Absence'

class AbsenceRepository {
  public items: Absence[]

  constructor(absences: AbsenceEntity[]) {
    this.items = absences.map((it) => new Absence(it))
  }

  public getById(absenceId: number): Absence | undefined {
    return this.items.find((it) => it.id === absenceId)
  }

  public toPaginatedResult(members: MemberRepository, page: number | undefined, pageSize: number | undefined): PaginatedResult<AbsenceListItemDto> {
    return paginateCollection(this.items.map((it: Absence) => it.toAbsenceListItemDto(members)), page, pageSize)
  }
}

export default AbsenceRepository
