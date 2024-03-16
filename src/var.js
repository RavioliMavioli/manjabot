const { execSync } = require('child_process')
const prompt = require('prompt-sync')()
const path = require('path')
const fs = require('fs')

const prefix_file = require("./assets/prefix.json")
const home_folder = "/home/manjabot/"
const prefix = prefix_file.prefix
let bot_token = null

const enc_path = "/home/manjabot/Applications/manjabot/src/assets/manjakey.json.gpg"
const tmp_path = "src/tmp.json"
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

module.exports = { bot_token, prefix }
