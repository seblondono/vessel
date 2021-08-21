import { CrewId, MemberDto, UserId } from './membersModel'

class Member {
  public id: number
  public userId: UserId
  public crewId: CrewId
  public name: string
  public image: string

  constructor(member: MemberDto) {
    this.id = member.id
    this.userId = member.userId
    this.crewId = member.crewId
    this.name = member.name
    this.image = member.image
  }
}

export default Member
