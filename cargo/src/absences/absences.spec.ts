import assert from 'assert'
import { absences } from '../api'
import { everyItemContainsKey } from '../util/testUtil'
import { AbsenceDto } from './model/abscensesModel'

const absenceKeys = [
  'admitterId',
  'admitterNote',
  'confirmedAt',
  'createdAt',
  'crewId',
  'endDate',
  'id',
  'memberNote',
  'rejectedAt',
  'startDate',
  'type',
  'userId',
]

describe('absences', () => {
  describe('every absence has key', () => {
    absenceKeys.forEach(key => {
      it(key, () => absences().then(everyItemContainsKey<AbsenceDto>(key)))
    })
  })

  it('every absence has same length', async () => {
    const crewAbsences = await absences()
    assert(crewAbsences.every((absence) => Object.keys(absence).length === absenceKeys.length))
  })
})
