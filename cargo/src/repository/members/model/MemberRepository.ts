import Member from './Member'
import { MemberEntity } from './membersModel'

class MemberRepository {
  public items: Member[]

  constructor(absences: MemberEntity[]) {
    this.items = absences.map((it) => new Member(it))
  }

  public getById(userId: number): Member | undefined {
    return this.items.find((it) => it.userId === userId)
  }
}

export default MemberRepository
