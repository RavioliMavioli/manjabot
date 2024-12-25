import { Client, IntentsBitField } from "discord.js"

function StartClient(token){
  const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,         // Server
      IntentsBitField.Flags.GuildMembers,   // Server Member
      IntentsBitField.Flags.GuildMessages,  // Server Messages
      IntentsBitField.Flags.MessageContent, // Server Messages
    ]
  })

  client.login(token)
  client.on("ready", (_client)=> {
      console.log(`${_client.user.tag} is online`)
  })
  
  return client
}

export { StartClient }