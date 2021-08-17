export type MemberDto = {
  id: number
  userId: number
  crewId: number
  name: string
  image: string
}

export type MembersResponseDto = {
  message: string
  payload: MemberDto[]
}
