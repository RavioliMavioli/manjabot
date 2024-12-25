import { RetreiveToken } from "./modules/creds.js"
import { StartClient } from "./modules/client.js"
import { PassCommand } from "./modules/commands.js"
import { StartCAI, Chat, StartCAICron } from "./modules/cai.js"

function Main(){
  // Start client
  let token = RetreiveToken()
  let client = StartClient(token)
  token = null

  // Start C.AI
  StartCAI()
  StartCAICron()

  // Listen to messages
  client.on("messageCreate", async (message)=>{
    if (message.mentions.repliedUser === client.user){
      await Chat(message)
    }
    else{
      await PassCommand(message)
    }
  })
  
}

Main()