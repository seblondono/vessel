import { AxiosInstance, AxiosResponse } from 'axios'
import { AbsenceDto } from '../../../cargo/src/absences/model/abscensesModel'
import { API_BASE_URL } from './httpClient'

export default class AbsenceClient {
  private client: AxiosInstance

  constructor(client: AxiosInstance) {
    this.client = client
  }

  public getAbsences(): Promise<AxiosResponse<AbsenceDto[]>> {
    return this.client.get(`${API_BASE_URL}/absences`)
  }
}
