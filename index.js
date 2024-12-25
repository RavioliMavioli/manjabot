import { RetreiveToken } from "./modules/creds.js"
import { StartClient } from "./modules/client.js"
import { PassCommand } from "./modules/commands.js"

async function Main(){
  // Start client
  let token = RetreiveToken()
  let client = StartClient(token)
  token = null

  // Listen to messages
  client.on("messageCreate", async (message)=>{
    await PassCommand(message)
  })
  
}

Main()