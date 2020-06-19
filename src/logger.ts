import fs from 'fs'

class Dlog {
    file: string
    constructor (file:string = './dlogger.txt') {
      this.file = file
    }

    log (txt: string) {
      const timeStamp = Date()
      fs.writeFileSync(this.file, `
        ${timeStamp.toString()}
          --START--
        ${txt}
          --END--
        `)
    }

    append (txt: string) {
      const timeStamp = Date()
      fs.appendFileSync(this.file, `
        ${timeStamp.toString()}
          ---
        ${txt}
          ---
        `)
    }
}

export { Dlog }
