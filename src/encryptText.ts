import * as crypto from 'crypto'

function encryptText(encryptionDetails: string, text: string): string {
  const [algorithm, secretKeyRaw, ivRaw] = encryptionDetails.split(':')

  const secretKey = crypto.createHash('sha256').update(String(secretKeyRaw)).digest('base64').substr(0, 32)
  const iv = Buffer.from(ivRaw, 'hex')

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return encrypted.toString('hex')
}

export {
  encryptText,
}
