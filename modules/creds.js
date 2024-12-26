import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import PromptSync from 'prompt-sync';

const prompt = PromptSync();

function RetreiveCreds(encPath, tmpPath, promptText){
  let privateKey = null
  let decFile = null
  while (1){
    try{
      privateKey = prompt(promptText)
      execSync(`gpg --pinentry-mode=loopback --passphrase "${privateKey}" --decrypt "${encPath}" > "${tmpPath}"`)
      break
    }
    catch(_){}
  }

  decFile = JSON.parse(readFileSync(tmpPath, 'utf8'))

  execSync(`rm "${tmpPath}"`)

  return decFile
}

export { RetreiveCreds }