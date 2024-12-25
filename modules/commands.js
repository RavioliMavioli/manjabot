
import { ExecuteShell } from "./shell.js"
import prefixes from "../prefix.json" with { type: "json" }
import { homedir } from "os"

async function PassCommand(message){
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
  if (msgAll === prefixes.prefix) {
    await SendEmuach(message)
    return
  }
  
  switch (subPrefix) {
    case prefixes.help:
      await SendHelp(message)
      break
    case prefixes.send:
      await Send(message, msgArrMerged)
      break
    case prefixes.sendfile:
      await SendFile(message, msgArrMerged)
      break
    case prefixes.screenshoot:
      await ScreenShoot(message)
    default:
      let stdout = await ExecuteShell(msg)
      await message.reply(stdout)
      .catch(async (err) => {
        await _RetErr(message, err)
      })
      break
  }
}

async function SendEmuach(message){
  await message.reply("emuach")
  .catch(async (err) => {
    await _RetErr(message, err)
  })
}

async function SendHelp(message){
  let help = "```" + `
  >> ${prefixes.help}
  >> ${prefixes.screenshoot}
  >> ${prefixes.send} {tulis apa disini terserah}
  >> ${prefixes.sendfile} {file path}
  >> {shell commands}

  Kalau mau chat sama aku, tinggal "Balas / Reply" pesanku aja.
  `
  + "```"
  await message.channel.send(help)
  .catch(async (err) => {
    await _RetErr(message, err)
  })
}

async function Send(message, content){
  try{
    if (message.reference === null || message.reference === undefined || message.reference === ""){
        await _SendMessage(message, content)
        return
    }

    let msgs = await message.channel.messages.fetch()
    msgs.filter(async (m) => {
      if (m.id != message.reference.messageId) return

      await m.reply(`${content} \`-${message.author.displayName}\``)
      .catch(async (err) => {
        await _RetErr(message, err)
      })
      await message.delete()
      .catch(async (err) => {
        await _RetErr(message, err)
      })
    })
  }
  catch (err){
    await _RetErr(message, err)
    console.log(err.toString())
  }
}
async function SendFile(message, content){
  message.reply({ files: [homedir() + "/" + content] })
  .catch((err) => {_RetErr(message, err)})
}

async function ScreenShoot(message, content){
  await _UnusableCommand(message)
}

async function DeleteMessages(message, content) {
  await _UnusableCommand(message)
}

async function _SendMessage (message, content){
  await message.channel.send(`${content} \` - ${message.author.displayName}\``)
  .catch(async (err) => {
    await _RetErr(message, err)
  })

  await message.delete()
  .catch(async (err) => {
    await _RetErr(message, err)
  })
}

async function _RetErr(message, err){
  await message.reply(err.toString())
  .catch((err2) => {
    console.log(err2.toString())
  })
  console.log(err.toString())
}

async function _UnusableCommand(message) {
  await message.reply("Command currently cannot be used.")
  .catch(async (err) => {
    await _RetErr(message, err)
  })
}

export { PassCommand }
