import { randHex } from './randHex'

function rndIV(): string {
  return randHex(8)
}

export {
  rndIV,
}
