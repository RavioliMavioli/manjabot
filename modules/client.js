import { Client, IntentsBitField } from "discord.js"

function StartClient(creds){
  const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,         // Server
      IntentsBitField.Flags.GuildMembers,   // Server Member
      IntentsBitField.Flags.GuildMessages,  // Server Messages
      IntentsBitField.Flags.MessageContent, // Server Messages
    ]
  })

  client.login(creds.token)
  client.on("ready", (c)=> {
      console.log(`${c.user.tag} is online`)
  })
  return client
}

export { StartClient }