import assert from 'assert'
import { absences } from '../api'
import { everyItemContainsKey, everyKeyHasValue } from '../../util/testUtil'
import { isEnumValue, isValue } from '../../util/typeGuardUtil'
import { AbsenceDto, AbsenceType } from './model/abscensesModel'

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

const absenceNotNullableKeys: (keyof AbsenceDto)[] = [
  'admitterNote',
  'createdAt',
  'crewId',
  'endDate',
  'id',
  'memberNote',
  'startDate',
  'type',
  'userId',
]

describe('absences', () => {
  describe('every absence', () => {
    describe('should have key', () => {
      absenceKeys.forEach(key => {
        it(key, () => absences().then(everyItemContainsKey<AbsenceDto>(key)))
      })
    })

    describe('should have key with value', () => {
      absenceNotNullableKeys.forEach(key => {
        it(key, () => absences().then(everyKeyHasValue<AbsenceDto>(key)))
      })
    })

    it('should have same length', async () => {
      const crewAbsences = await absences()
      assert(crewAbsences.every((absence) => Object.keys(absence).length === absenceKeys.length))
    })

    it('should have one of confirmedAt or rejectedAt', async () => {
      const crewAbsences = await absences()
      crewAbsences.forEach((absence) => {
        if (isValue(absence.confirmedAt)) {
          assert(!isValue(absence.rejectedAt))
        } else if (isValue(absence.rejectedAt)) {
          assert(!isValue(absence.confirmedAt))
        }
      })
    })

    it('should have a valid AbsenceType', async () => {
      const crewAbsences = await absences()
      crewAbsences.forEach((absence) => {
        assert(isEnumValue(AbsenceType).exists(absence.type))
      })
    })
  })
})
