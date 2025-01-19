import { exec } from "child_process"

const MAX_LENGTH = 2000

let outputMsg = null

async function ExecuteShell(command, sudo, home){
  outputMsg = await TryExecShellCommand(command, sudo, home)

  if (outputMsg === null || outputMsg === undefined || outputMsg === "") return "``` ```"
  if (outputMsg.length >= MAX_LENGTH) return "```\n" + outputMsg.slice(0, MAX_LENGTH/2) + "```"

  return "```\n" + outputMsg + "```"
}

async function TryExecShellCommand(command, sudo, home) {
  let alias = [
    {cmd: "apt", alias: "apt -y"},
    {cmd: "pacman", alias: "pacman --noconfirm"},
    {cmd: "neofetch", alias: "neofetch --stdout"},
    {cmd: "sudo", alias: `echo ${sudo} | sudo -S`}
  ]
  alias.forEach((al) => {
    if (command.includes(al.cmd)) command = command.replace(al.cmd, al.alias)
  })
  return new Promise((resolve, _) => {
    exec(command, {cwd: home, shell:"/bin/bash"},(error, stdout, stderr) => {
      if (error) {
        console.log(error)
      }
        resolve(stdout ? stdout : stderr)
      })
  })
 }

export { ExecuteShell }