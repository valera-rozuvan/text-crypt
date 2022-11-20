import arg from 'arg'
import { rndIV, encryptText, decryptText } from 'text-crypt'

const APP_NAME = 'text-crypt-cli'
const APP_VERSION = '0.0.2'

const args = arg({
  // Types
  '--help': Boolean,
  '--version': Boolean,

  '--generate-rnd-iv': Boolean,
  '--encrypt': Boolean,
  '--decrypt': Boolean,

  '--crypt-opts': String,  // --crypt-opts <string> or --crypt-opts=<string>
  '--text': String,        // --text <string> or --text=<text

  // Aliases
  '-v': '--version',
  '-h': '--help',

  '-i': '--generate-rnd-iv',
  '-e': '--encrypt',
  '-d': '--decrypt',

  '-o': '--crypt-opts',
  '-t': '--text',
})

function generalHelp() {
  console.log(`
    -h|--help     Shows this information.
    -v|--version  Shows version.

    -i|--generate-rnd-iv  Generates a random initialization vector.
    -e|--encrypt          Performs encryption operation.
    -d|--decrypt          Performs decryption operation.

    -o|--crypt-opts "string"  Options to be used for crypto function. See below.

    -t|--text "string"  Text that should be encrypted or decrypted.
  `)
}

function cryptOptsHelp() {
  console.log(`
    Argument '--crypt-opts' expects a string in the format "{crypt func}:{password str}:{iv str}".
    Supported "{crypt func}" is 'aes-256-ctr'.
    Minimum "{password str}" length is 1.

    You can pass the '--generate-rnd-iv' argument to generate a random "{iv str}".

    Example of a valid '--crypt-opts' string:

      "aes-256-ctr:NQoJYMIH:7d617955ba28cd5569d226f12518799b"
  `)
}

function missingArgHelp(argName: string) {
  console.log(`
    Please provide '${argName}' argument to program.
  `)
}

let cryptOpts: string|null = null
if (args['--crypt-opts']) {
  cryptOpts = args['--crypt-opts']

  const opts = cryptOpts.split(':')

  if (!opts || opts.length !== 3 || opts[0] !== 'aes-256-ctr' || (typeof opts[1] === 'string' && opts[1].length === 0)) {
    cryptOptsHelp()
    process.exit()
  }
}

let text: string|null = null
if (args['--text']) {
  text = args['--text']
}

if (args['--help']) {
  console.log('Help:')
  generalHelp()
  console.log('Details:')
  cryptOptsHelp()
} else if (args['--version']) {
  console.log(`
    ${APP_NAME} - v${APP_VERSION}
  `)
} else if (args['--generate-rnd-iv']) {
  console.log(rndIV())
} else if (args['--encrypt']) {
  if (cryptOpts === null) {
    missingArgHelp('--crypt-opts')
    process.exit()
  } else if (text === null) {
    missingArgHelp('--text')
    process.exit()
  }

  console.log(encryptText(cryptOpts, text))
} else if (args['--decrypt']) {
  if (cryptOpts === null) {
    missingArgHelp('--crypt-opts')
    process.exit()
  } else if (text === null) {
    missingArgHelp('--text')
    process.exit()
  }

  console.log(decryptText(cryptOpts, text))
} else {
  console.log(`
    Program expects arguments. Try passing '--help'.
  `)
}
