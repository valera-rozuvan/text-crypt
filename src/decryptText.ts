import * as crypto from 'crypto'

function decryptText(encryptionDetails: string, hash: string): string {
  const [algorithm, secretKeyRaw, ivRaw] = encryptionDetails.split(':')

  const secretKey = crypto.createHash('sha256').update(String(secretKeyRaw)).digest('base64').substr(0, 32)
  const iv = Buffer.from(ivRaw, 'hex')

  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);

  return decrpyted.toString()
}

export {
  decryptText,
}
