import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import AbsenceClient from './absenceClient'

const defaultAxiosRequestConfig: AxiosRequestConfig = {
  ...axios.defaults,
}

class HttpClient {
  public readonly absenceClient: AbsenceClient

  private readonly client: AxiosInstance

  constructor() {
    this.client = axios.create(defaultAxiosRequestConfig)

    this.absenceClient = new AbsenceClient(this.client)
  }
}

const httpClient = new HttpClient()
export default httpClient
