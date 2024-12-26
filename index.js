import { StartClient } from "./modules/client.js"
import { PassCommand } from "./modules/commands.js"
import { StartCAI, Chat, StartCAICron } from "./modules/cai.js"

function Main(){
  // Start client
  let client = StartClient()

  // Start C.AI
  StartCAI()
  StartCAICron()

  // Listen to messages
  client.on("messageCreate", async (message)=>{
    if (message.mentions.repliedUser === client.user){
      Chat(message)
    }
    else{
      PassCommand(message)
    }
  })
  
}

Main()