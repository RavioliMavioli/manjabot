import { CAINode } from "cainode"
import { ReplyMessage } from "./commands.js"
import { RetreiveCreds } from "./creds.js";
import cron from 'node-cron'

const creds = RetreiveCreds(
  "cai.json.gpg",
  "cai.json",
  "CAI GPG Password: "
)
let client = null

async function StartCAI(){
  client = new CAINode()
  await TryLogin(creds.token)
  console.log("CAI Started.")

  await client.character.connect(creds.characterId)
  ResetConversation()
  console.log("Manjabot AI connected.")
}

async function Chat(message) {
    const author = message.author.displayName
    const content = message.content
    const response = await client.character.send_message(`"${author}": ${content}`)
    const responseText = response.turn.candidates ? response.turn.candidates[0].raw_content : null
    
    if (!responseText) return

    ReplyMessage(message, responseText)
}

function StartCAICron(){
  // Every  30 minutes
  const job = cron.schedule('*/30 * * * *', () => {
    CAIHandShake()
  })
  job.start()
}

function ResetConversation() {
  client.character.create_new_conversation(false)
}

async function CAIHandShake(){
  await TryLogin(creds.token)
  console.log("CAI reconnected.")
  await client.character.connect(creds.characterId).catch((err) => {
    console.log(err)
  })
  console.log("Manjabot AI reconnected.")
}

async function GenerateToken() {
  let token = await client.generate_token(creds.email, 0);
  return token
}

async function TryLogin(token) {
  try{
    await client.login(token)
  }
  catch(err){
    const newToken = await GenerateToken()
    await TryLogin(newToken)
  }
}

export { StartCAI, Chat, StartCAICron, ResetConversation }
