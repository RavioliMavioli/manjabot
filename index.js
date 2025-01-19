import { StartClient } from "./modules/client.js"
import { PassCommand } from "./modules/commands.js"
import { StartCAI, Chat, StartCAICron } from "./modules/cai.js"
import { RetreiveCreds } from "./modules/creds.js"
import PromptSync from 'prompt-sync'
import minimist from "minimist"

const prompt = PromptSync();

function Main(){
  // Get arguments if any
  let args = minimist(process.argv.slice(2))
  let sudo = args.sudo ? args.sudo : prompt('sudo password: ')
  
  // Get credentials
  const CAIcreds = RetreiveCreds(
    "cai.json.gpg",
    "cai.json",
    "CAI GPG Password: ",
    args.cai
  )
  const TokenCreds = RetreiveCreds(
    "token.json.gpg",
    "token.json",
    "Token GPG Password: ",
    args.token
  )
  
  // Start client
  let client = StartClient(TokenCreds)

  // Start C.AI
  StartCAI(CAIcreds)
  StartCAICron()

  // Listen to messages
  client.on("messageCreate", async (message)=>{
    if (message.mentions.repliedUser === client.user){
      Chat(message)
    }
    else{
      console.log(sudo)
      PassCommand(message, sudo)
    }
  })
  
}

Main()