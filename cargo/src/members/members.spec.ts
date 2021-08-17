import assert from 'assert'
import { members } from '../api'
import { everyItemContainsKey } from '../util/testUtil'
import { MemberDto } from './model/membersModel'

const memberKeys = ['id', 'crewId', 'name', 'userId', 'image']

describe('members', () => {
  describe('every member has key', () => {
    memberKeys.forEach(key => {
      it(key, () => members().then(everyItemContainsKey<MemberDto>(key)))
    })
  })

  it('every member has same length', async () => {
    const crewMembers = await members()
    assert(crewMembers.every((member) => Object.keys(member).length === memberKeys.length))
  })
})
