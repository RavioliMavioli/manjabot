import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import PromptSync from 'prompt-sync';

const prompt = PromptSync();
const encPath = "token.json.gpg"
const tmpPath = "tmp.json"

function RetreiveToken(){
  let privateKey = null
  let decFile = null
  while (1){
    try{
      privateKey = prompt('emuach? ')
      execSync(`gpg --pinentry-mode=loopback --passphrase "${privateKey}" --decrypt "${encPath}" > "${tmpPath}"`)
      break
    }
    catch(err){}
  }

  decFile = JSON.parse(readFileSync(tmpPath, 'utf8'))

  execSync(`rm "${tmpPath}"`)

  return decFile.token
}

export { RetreiveToken }