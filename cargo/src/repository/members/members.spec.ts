import assert from 'assert'
import { memberEntities } from '../../database/memberDb'
import { everyItemContainsKey } from '../../util/testUtil'
import { MemberEntity } from './model/membersModel'

const memberEntityKeys = ['id', 'crewId', 'name', 'userId', 'image']

describe('member entities', () => {
  describe('every member entity has key', () => {
    memberEntityKeys.forEach(key => {
      it(key, () => memberEntities().then(everyItemContainsKey<MemberEntity>(key)))
    })
  })

  it('every member has same length', async () => {
    const crewMembers = await memberEntities()
    assert(crewMembers.every((member) => Object.keys(member).length === memberEntityKeys.length))
  })
})
