import fs from 'fs'

export const readJsonFile = <T>(path: string): Promise<T> =>
  new Promise<string>(resolve => fs.readFile(path, 'utf8', (_, data: string) => resolve(data)))
    .then((data) => JSON.parse(data))
    .then(data => data.payload)


