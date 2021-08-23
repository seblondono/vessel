import path from 'path'
import { AbsenceEntity } from '../repository/absences/model/abscensesModel'
import AbsenceRepository from '../repository/absences/model/AbsenceRepository'
import { readJsonFile } from '../util/readJsonFile'

const ABSENCES_PATH = path.join(__dirname, './json_files', 'absences.json')

export const absenceEntities = (): Promise<AbsenceEntity[]> => readJsonFile<AbsenceEntity[]>(ABSENCES_PATH)
export const absences = (): Promise<AbsenceRepository> => absenceEntities().then((it) => new AbsenceRepository(it))
