import { homedir } from "os";
import { exec } from "child_process";
import PromptSync from 'prompt-sync';

const MAX_LENGTH = 2000
const prompt = PromptSync();
const homeDir = homedir()

let outputMsg = null
let sudo = prompt('sudo password: ')
let alias = [
  {cmd: "apt", alias: "apt -y"},
  {cmd: "neofetch", alias: "neofetch --stdout"},
  {cmd: "sudo", alias: `echo ${sudo} | sudo -S`}
]

async function ExecuteShell(command){
  outputMsg = await TryExecShellCommand(command)

  if (outputMsg === null || outputMsg === undefined || outputMsg === "") return "``` ```"
  if (outputMsg.length >= MAX_LENGTH) return "```\n" + outputMsg.slice(0, MAX_LENGTH/2) + "```"

  return "```\n" + outputMsg + "```"
}

function TryExecShellCommand(command) {
  alias.forEach((al) => {
    if (command.includes(al.cmd)) command = command.replace(al.cmd, al.alias)
  })
  return new Promise((resolve, reject) => {
    exec(command, {cwd: homeDir, shell:"/bin/bash", env:"~/.bashrc"},(error, stdout, stderr) => {
 
    if (error) {
      console.warn(error)
    }
      resolve(stdout ? stdout : stderr)
    })
 
  })
 }

export { ExecuteShell }