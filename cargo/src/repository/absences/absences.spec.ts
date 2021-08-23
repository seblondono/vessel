import assert from 'assert'
import { absenceEntities } from '../../database/absenceDb'
import { everyItemContainsKey, everyKeyHasValue } from '../../util/testUtil'
import { isEnumValue, isValue } from '../../util/typeGuardUtil'
import { AbsenceEntity, AbsenceType } from './model/abscensesModel'

const absenceEntityKeys = [
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

const absenceEntityNotNullableKeys: (keyof AbsenceEntity)[] = [
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

describe('absence entities', () => {
  describe('every absence entity', () => {
    describe('should have key', () => {
      absenceEntityKeys.forEach(key => {
        it(key, () => absenceEntities().then(everyItemContainsKey<AbsenceEntity>(key)))
      })
    })

    describe('should have key with value', () => {
      absenceEntityNotNullableKeys.forEach(key => {
        it(key, () => absenceEntities().then(everyKeyHasValue<AbsenceEntity>(key)))
      })
    })

    it('should have same length', async () => {
      const crewAbsences = await absenceEntities()
      assert(crewAbsences.every((absence) => Object.keys(absence).length === absenceEntityKeys.length))
    })

    it('should have one of confirmedAt or rejectedAt', async () => {
      const crewAbsences = await absenceEntities()
      crewAbsences.forEach((absence) => {
        if (isValue(absence.confirmedAt)) {
          assert(!isValue(absence.rejectedAt))
        } else if (isValue(absence.rejectedAt)) {
          assert(!isValue(absence.confirmedAt))
        }
      })
    })

    it('should have a valid AbsenceType', async () => {
      const crewAbsences = await absenceEntities()
      crewAbsences.forEach((absence) => {
        assert(isEnumValue(AbsenceType).exists(absence.type))
      })
    })
  })
})
