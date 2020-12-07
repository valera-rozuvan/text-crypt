import * as crypto from 'crypto'

function randHex(numBytes: number): string {
  return crypto.randomBytes(numBytes).toString('hex')
}

export {
  randHex,
}
