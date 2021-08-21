import fs from 'fs'
import path from 'path'
import { AbsenceDto } from './absences/model/abscensesModel'
import Absences from './absences/model/Absences'
import Members from './members/model/Members'
import { MemberDto } from './members/model/membersModel'

const ABSENCES_PATH = path.join(__dirname, './../json_files', 'absences.json')
const MEMBERS_PATH = path.join(__dirname, './../json_files', 'members.json')

const readJsonFile = <T>(path: string) =>
  new Promise<string>(resolve => fs.readFile(path, 'utf8', (_, data: string) => resolve(data)))
    .then((data) => JSON.parse(data))
    .then<T>(data => data.payload)

export const members = (): Promise<Members> => readJsonFile<MemberDto[]>(MEMBERS_PATH).then((it) => new Members(it))
export const absences = (): Promise<Absences> => readJsonFile<AbsenceDto[]>(ABSENCES_PATH)
  .then((it) => new Absences(it))
