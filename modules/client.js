import { Client, IntentsBitField } from "discord.js"

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,         // Server
    IntentsBitField.Flags.GuildMembers,   // Server Member
    IntentsBitField.Flags.GuildMessages,  // Server Messages
    IntentsBitField.Flags.MessageContent, // Server Messages
  ]
})

function StartClient(token){
    client.login(token)
    client.on("ready", (_client)=> {
        console.log(`${_client.user.tag} is online`)
    })
    return client
}

export { StartClient }