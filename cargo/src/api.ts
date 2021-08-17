import fs from 'fs'
import path from 'path'
import { AbsenceDto } from './absences/model/abscensesModel'
import { MemberDto } from './members/model/membersModel'

const ABSENCES_PATH = path.join(__dirname, './../json_files', 'absences.json')
const MEMBERS_PATH = path.join(__dirname, './../json_files', 'members.json')

const readJsonFile = <T>(path: string) =>
  new Promise<string>(resolve => fs.readFile(path, 'utf8', (_, data: string) => resolve(data)))
    .then((data) => JSON.parse(data))
    .then<T>(data => data.payload)

export const members = (): Promise<MemberDto[]> => readJsonFile<MemberDto[]>(MEMBERS_PATH)
export const absences = (): Promise<AbsenceDto[]> => readJsonFile<AbsenceDto[]>(ABSENCES_PATH)
