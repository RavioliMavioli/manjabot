import { CAINode } from "cainode"
import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import PromptSync from 'prompt-sync';

const prompt = PromptSync();

const encPath = "cai.json.gpg"
const tmpPath = "cai.json"

async function GenerateToken(client) {
    let token = await client.generate_token(creds.email, 0);
    return token
}

async function TryLogin(client, token) {
    try{
        await client.login(token)
    }
    catch(err){
        const newToken = await GenerateToken(client)
        await TryLogin(client, newToken)
    }
}

async function StartCAI(){

    const client = new CAINode()
    const creds = await RetreiveCreds()
    await TryLogin(client, creds.token)
    console.log("CAI Started: ")
    await client.character.connect(creds.characterId)
    await client.character.create_new_conversation(false)
    console.log("Manjabot AI connected.")
    return client
}

async function Chat(client, message) {

    const author = message.author.displayName
    const content = message.content
    const response = await client.character.send_message(`"${author}": "${content}"`)
    const responseText = response.turn.candidates ? response.turn.candidates[0].raw_content : null
    
    if (!responseText) return

    await message.reply(responseText)
    .catch(async (err) => {
      await _RetErr(message, err)
    })
}

async function RetreiveCreds(){
  let privateKey = null
  let decFile = null
  while (1){
    try{
      privateKey = prompt('CAI GPG key: ')
      await execSync(`gpg --pinentry-mode=loopback --passphrase "${privateKey}" --decrypt "${encPath}" > "${tmpPath}"`)
      break
    }
    catch(err){}
  }

  decFile = await JSON.parse(readFileSync(tmpPath, 'utf8'))

  await execSync(`rm "${tmpPath}"`)

  return decFile

}

async function _RetErr(message, err){
    await message.reply(err.toString())
    .catch((err2) => {
      console.log(err2.toString())
    })
    console.log(err.toString())
  }

export { StartCAI, Chat }
