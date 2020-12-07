import { randHex } from './randHex'

function rndIV(): string {
  return randHex(512)
}

export {
  rndIV,
}
