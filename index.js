import { RetreiveToken } from "./modules/creds.js"
import { StartClient } from "./modules/client.js"
import { PassCommand } from "./modules/commands.js"
import { StartCAI, Chat } from "./modules/cai.js"

async function Main(){
  // Start client
  let token = await RetreiveToken()
  let client = await StartClient(token)
  let caiClient = await StartCAI()
  token = null

  // Listen to messages
  client.on("messageCreate", async (message)=>{
    if (message.mentions.repliedUser === client.user){
      await Chat(caiClient, message)
    }
    else{
      await PassCommand(message)
    }
  })
  
}

Main()