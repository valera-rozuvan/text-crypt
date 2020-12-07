import { randHex } from './randHex'

function rndIV(): string {
  return randHex(16)
}

export {
  rndIV,
}
