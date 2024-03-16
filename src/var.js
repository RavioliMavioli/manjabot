const { execSync } = require('child_process')
const prompt = require('prompt-sync')()
const fs = require('fs')

const prefix_file = require("./assets/prefix.json")
let bot_token = null

const enc_path = "src/assets/manjakey.json.gpg"
const tmp_path = "src/assets/tmp.json"
let dec_file = null


let privateKey = "emuach"
privateKey = prompt('emuach? ')

const cmd = `gpg --pinentry-mode=loopback --passphrase "${privateKey}" --decrypt "${enc_path}" > "${tmp_path}"`

command(cmd)

dec_file = JSON.parse(fs.readFileSync(tmp_path, 'utf8'))

command(`rm "${tmp_path}"`)

bot_token = dec_file.bot_token

function command(cmd){
  execSync(cmd, (error, stdout, stderr) => {

    if (error) {
      return (error)
    }
    return (stdout + stderr)
})
}

module.exports = { bot_token, prefix_file, command }
