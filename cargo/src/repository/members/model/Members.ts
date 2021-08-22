import Member from './Member'
import { MemberDto } from './membersModel'

class Members {
  public items: Member[]

  constructor(absences: MemberDto[]) {
    this.items = absences.map((it) => new Member(it))
  }

  public getById(userId: number): Member | undefined {
    return this.items.find((it) => it.userId === userId)
  }
}

export default Members
