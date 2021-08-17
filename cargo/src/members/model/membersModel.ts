export type UserId = number
export type CrewId = number

export type MemberDto = {
  id: number
  userId: UserId
  crewId: CrewId
  name: string
  image: string
}

export type MembersResponseDto = {
  message: string
  payload: MemberDto[]
}
