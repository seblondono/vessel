import { PaginatedResult } from '../../../controller/model/paginatedResult'
import paginateCollection from '../../../util/paginateCollection'
import MemberRepository from '../../members/model/MemberRepository'
import { AbsenceEntity, AbsenceListItemDto, AbsenceQueryFilterType } from './abscensesModel'
import Absence from './Absence'

class AbsenceRepository {
  public items: Absence[]

  constructor(absences: AbsenceEntity[]) {
    this.items = absences.map((it) => new Absence(it))
  }

  public getById(absenceId: number): Absence | undefined {
    return this.items.find((it) => it.id === absenceId)
  }

  public toPaginatedResult(
    members: MemberRepository, page: number | undefined,
    pageSize: number | undefined,
  ): PaginatedResult<AbsenceListItemDto> {
    return paginateCollection(this.items.map((it: Absence) => it.toAbsenceListItemDto(members)), page, pageSize)
  }

  public applyFilters(filters: Partial<Record<AbsenceQueryFilterType, any>>): AbsenceRepository {
    return new AbsenceRepository(this.items.map((it) => it.toAbsenceEntity()).filter((it: AbsenceEntity) => {
      for (const key in filters) {
        if (!Object.prototype.hasOwnProperty.call(
          it, key) || it[key as keyof AbsenceEntity] != filters[key as AbsenceQueryFilterType]) {
          return false
        }
        return true
      }
    }))
  }
}

export default AbsenceRepository
