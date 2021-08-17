import assert from 'assert'
import { AbsenceDto } from './absences/model/abscensesModel'
import { absences, members } from './api'
import { MemberDto } from './members/model/membersModel'

const everyItemContainsKey = <T>(key: string) => (collection: T[]) =>
  collection.forEach(item => assert(Object.keys(item).includes(key)))

describe('members', () => {
  describe('every member has key', () => {
    ['id', 'name', 'userId', 'image'].forEach(key => {
      it(key, () => members().then(everyItemContainsKey<MemberDto>(key)))
    })
  })
})

describe('absences', () => {
  describe('every absence has key', () => {
    [
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
    ].forEach(key => {
      it(key, () => absences().then(everyItemContainsKey<AbsenceDto>(key)))
    })
  })
})
