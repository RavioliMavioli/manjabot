const os = require("os");
const prompt = require('prompt-sync')()
let sudo_pass = prompt('sudo password: ')
let home_folder = os.homedir() + "/"
let working_dir = home_folder
let output_msg
let alias = [
  {cmd: "pacman", alias: "pacman --noconfirm"},
  {cmd: "neofetch", alias: "neofetch --stdout"},
  {cmd: "yay", alias: "yay --noconfirm"},
  {cmd: "sudo", alias: `echo ${sudo_pass} | sudo -S`}
]
const MAX_LENGTH = 2000

async function process_input(command){

  output_msg = await execShellCommand(command)

  if (output_msg === null || output_msg === undefined || output_msg === "") return "``` ```"
  if (output_msg.length >= MAX_LENGTH) return "```\n" + output_msg.slice(0, MAX_LENGTH/2) + "```"

  return "```\n" + output_msg + "```"
}

function execShellCommand(cmd) {
 const exec = require('child_process').exec;
 alias.forEach((al) => {
    if (cmd.includes(al.cmd)) cmd = cmd.replace(al.cmd, al.alias)
 })

 return new Promise((resolve, reject) => {
  let can_exec = true
  if (can_exec){

    exec(cmd, {cwd: working_dir, shell:"/bin/zsh", env:"~/.zshrc"},(error, stdout, stderr) => {

    if (error) {
      console.warn(error)
    }
    resolve(stdout? stdout : stderr)
    })

  }

 })
}

async function change_pass(_message, msg_sliced, change_prefix){
  let pwd = msg_sliced.replace(change_prefix, "").replace(" ", "")
  
  sudo_pass = pwd
  
  alias = [
    {cmd: "pacman", alias: "pacman --noconfirm"},
    {cmd: "neofetch", alias: "neofetch --stdout"},
    {cmd: "yay", alias: "yay --noconfirm"},
    {cmd: "sudo", alias: `echo ${sudo_pass} | sudo -S`}
  ]
  await _message.reply("```Sudo password changed```")
  return
}

module.exports = { process_input, home_folder, change_pass }
