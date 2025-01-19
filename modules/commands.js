
import { MessageType } from "discord.js"
import { ExecuteShell } from "./shell.js"
import { ResetConversation } from "./cai.js"
import { homedir } from "os"
import prefixes from "../prefix.json" with { type: "json" }

async function PassCommand(message, sudo){
  let msgAll = message.content
  let msg = msgAll.substring(prefixes.prefix.length)
  let msgArr = null
  let subPrefix = null
  let msgArrMerged = null

  while (msg.startsWith(" ")){
    msg = msg.slice(1)
  }

  msgArr = msg.split(" ")
  subPrefix = msgArr[0]
  msgArr.shift()
  msgArrMerged = msgArr.join(" ")

  if (message.author.bot) return
  if (!msgAll.startsWith(prefixes.prefix)) return

  LogMessage(message, message.content)

  if (msgAll === prefixes.prefix) {
    ReplyMessage(message, "Emuach 🥰")
    return
  }

  switch (subPrefix) {
    case prefixes.help:
      SendHelp(message)
      break
    case prefixes.send:
      Send(message, msgArrMerged)
      DeleteMessage(message)
      break
    case prefixes.sendfile:
      SendFile(message, msgArrMerged)
      break
    case prefixes.screenshoot:
      ScreenShoot(message)
      break
    case prefixes.resetAI:
      ResetConversation()
      ReplyMessage(message, "i forgor 💀")
      break
    default:
      let stdout = await ExecuteShell(msg, sudo)
      ReplyMessage(message, stdout)
      break
  }
}

function SendHelp(message){
  let help = "```" + `
  >> ${prefixes.help}
  >> ${prefixes.screenshoot}
  >> ${prefixes.resetAI}
  >> ${prefixes.send} {tulis apa disini terserah}
  >> ${prefixes.sendfile} {file path}
  >> {shell commands}

  Kalau mau chat sama aku, tinggal "Balas / Reply" pesanku aja.
  `
  + "```"
  ReplyMessage(message, help)
}

async function Send(message, content){
  const contentQuoted = `${content} \`-${message.author.displayName}\``
  if (message.type !== MessageType.Reply){
      SendMessage(message, contentQuoted)
      return
  }

  let msgs = await message.channel.messages.fetch()
  msgs.filter((m) => {
    if (m.id != message.reference.messageId) return
    ReplyMessage(m, contentQuoted)
  })
}

function SendFile(message, content){
  message.reply({ files: [homedir() + "/" + content] })
  .catch((err) => {RetErr(message, err)})
}

function ScreenShoot(message, content){
  UnusableCommand(message)
}

function DeleteMessage(message) {
  message.delete()
  .catch((err) => {
    RetErr(message, err)
  })
}

function ReplyMessage (message, content){
  message.reply(content)
  .catch((err) => {
    RetErr(message, err)
  })
  LogMessage(message, content)
}

function SendMessage (message, content){
  message.channel.send(content)
  .catch((err) => {
    RetErr(message, err)
  })
  LogMessage(message, content)
}

function RetErr(message, err){
  message.reply(err.toString())
  .catch((err2) => {
    console.log(err2.toString())
  })
  console.log(err.toString())
}

function UnusableCommand(message){
  ReplyMessage(message, "Command currently cannot be used.")
}

function LogMessage(message, content){
  console.log(`${message.author.displayName}: ${content}`)
}

export { PassCommand, ReplyMessage, SendMessage }
