import path from 'path'
import MemberRepository from '../repository/members/model/MemberRepository'
import { MemberEntity } from '../repository/members/model/membersModel'
import { readJsonFile } from '../util/readJsonFile'

const MEMBERS_PATH = path.join(__dirname, './json_files', 'members.json')

export const memberEntities = (): Promise<MemberEntity[]> => readJsonFile<MemberEntity[]>(MEMBERS_PATH)
export const members = (): Promise<MemberRepository> => memberEntities().then((it) => new MemberRepository(it))
