const { Client, IntentsBitField } = require("discord.js")

const { bot_token, prefix_file, command } = require("./var.js")
const { process_input, home_folder, change_pass } = require ("./lib/cli.js")


const prefix = prefix_file.prefix
const send_prefix = prefix_file.send_prefix
const sendfile_prefix = prefix_file.sendfile_prefix
const help_prefix = prefix_file.help_prefix
const change_prefix = prefix_file.change_prefix
const send_ss_prefix = prefix_file.send_ss_prefix

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,         // Server
    IntentsBitField.Flags.GuildMembers,   // Server Member
    IntentsBitField.Flags.GuildMessages,  // Server Messages
    IntentsBitField.Flags.MessageContent, // Server Messages
  ]
})

client.login(bot_token)

client.on("ready", (_client)=>{
  console.log(`${_client.user.tag} is online`)
})
// Listen message
client.on("messageCreate", async (_message)=>{

  let msg = _message.content
  let msg_sliced = msg.substring(prefix.length)
  console.log(`${_message.author.displayName}: ${msg}`)
  if (_message.author.bot) return
  if (msg.startsWith(prefix)){
    while (msg_sliced.startsWith(" ")) msg_sliced = msg_sliced.slice(1)
    if(msg === prefix) {_message.reply("emuach"); return}
    if(msg_sliced.startsWith(help_prefix)) {send_help(_message); return}
    if(msg_sliced.startsWith(send_prefix)) {send_or_reply(_message, msg_sliced); return}
    if(msg_sliced.startsWith(send_ss_prefix)) {send_ss(_message); return}
    if(msg_sliced.startsWith(change_prefix)) {change_pass(_message, msg_sliced, change_prefix); return}

    let final_msg = await process_input(msg_sliced)
    console.log(final_msg)
    _message.reply(final_msg).catch((err) => {_message.reply(err.toString())} )
  }
})

async function send_or_reply(_message, msg_sliced){
try{
    let msg = msg_sliced.replace(send_prefix, "")
    let msg_file = msg_sliced.replace(sendfile_prefix, "")

    while (msg_file.startsWith(" ")) msg_file = msg_file.slice(1)

    if (_message.reference === null || _message.reference === undefined || _message.reference === ""){
      if (!msg_sliced.includes(sendfile_prefix)) {
        send_msg(_message, msg)
        return
      }
      send_files(_message, msg_file)
      return
    }

    let msgs = await _message.channel.messages.fetch()
    msgs.filter((m) => {

      if (m.id == _message.reference.messageId) {
        if (!msg_sliced.includes(sendfile_prefix)) {
          m.reply(`${msg} \`-${_message.author.displayName}\``).catch((err) => {ret_err(_message, err)})
          _message.delete().catch((err) => {ret_err(_message, err)})
          return
        }
        _message.reply({ files: [home_folder + msg_file] })
        .catch((err) => {ret_err(_message, err)})
        return
        }

    })

}
catch (err){
  ret_err(_message, err)
  console.log(err.toString())
}

}

function send_msg (_message, msg){
    _message.channel.send(`${msg} \`-${_message.author.displayName}\``).catch((err) => {ret_err(_message, err)})
    _message.delete().catch((err) => {ret_err(_message, err)})
}

function send_files (_message, msg){
    _message.reply({ files: [home_folder + msg] })
    .catch((err) => {ret_err(_message, err)})
}

function send_help(_message){
  let help = "```" + ">> help\n>> upload_ss\n>> changepass {new password}\n>> send {tulis apa disini terserah}\n>> sendfile {file path}\n>> {shell commands}" + "```"

  _message.channel.send(help)
}

function ret_err(_message, err){
  _message.reply(err.toString()).catch((err2) => {
                                                                console.log(err2.toString());

                                                              })
  console.log(err.toString())
}


async function send_ss(_message){
  const ss_path = home_folder + "Desktop/ss.jpg"
  try{
    await command(`spectacle -f -b -o ${ss_path}`)
  }
  catch(err){

  }
  await send_files(_message, "Desktop/ss.jpg")
}
