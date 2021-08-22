export type UserId = number
export type CrewId = number

export type MemberEntity = {
  id: number
  userId: UserId
  crewId: CrewId
  name: string
  image: string
}
