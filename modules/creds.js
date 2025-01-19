import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import PromptSync from 'prompt-sync'

const prompt = PromptSync();

function RetreiveCreds(encPath, tmpPath, promptText, inputIfAny){
  let privateKey = null
  let decFile = null
  while (!inputIfAny){
    try{
      privateKey = prompt(promptText)
      Decrypt(privateKey, encPath, tmpPath)
      break
    }
    catch(_){}
  }
  
  if (inputIfAny) {
    privateKey = inputIfAny
    Decrypt(privateKey, encPath, tmpPath)
  }

  decFile = JSON.parse(readFileSync(tmpPath, 'utf8'))

  execSync(`rm "${tmpPath}"`)

  return decFile
}

function Decrypt(privateKey, encPath, tmpPath){
  execSync(`gpg --pinentry-mode=loopback --passphrase "${privateKey}" --decrypt "${encPath}" > "${tmpPath}"`)
}

export { RetreiveCreds }