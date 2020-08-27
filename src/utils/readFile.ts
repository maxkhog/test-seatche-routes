import * as fs from 'fs'

export const readFileByName = (fileName: string): string[] => {
  try {

    const data = fs.readFileSync(fileName, 'utf-8')
    const lines = data.split(/\r?\n/)

    return lines
  
  } catch (err) {
    return err
  }
}
