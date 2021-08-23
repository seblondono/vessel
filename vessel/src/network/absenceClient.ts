import { AxiosInstance, AxiosResponse } from 'axios'
import { PaginatedResult } from '../../../cargo/src/controller/model/paginatedResult'
import { AbsenceListItemDto } from '../../../cargo/src/repository/absences/model/abscensesModel'
import { API_BASE_URL } from './httpClient'

export default class AbsenceClient {
  private client: AxiosInstance

  constructor(client: AxiosInstance) {
    this.client = client
  }

  public getAbsences(queryParams: URLSearchParams): Promise<AxiosResponse<PaginatedResult<AbsenceListItemDto>>> {
    return this.client.get(`${API_BASE_URL}/absence`, {
      params: queryParams,
    })
  }
}
