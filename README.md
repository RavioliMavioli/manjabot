# Manjabot
Control your PC/Container/VM via discord bot, for example you type ```>> neofetch```,<br>
it will print neofetch of the system you are in! <br><br>

Best ran on a docker/container or a Virtual Mechine for security reasons. <br>

## Installation:
```
git clone https://github.com/RavioliMavioli/manjabot
cd manjabot
npm install
node index.js
```

## Commands:<br>
```>> help```  displays bot commands.<br><br>
```>> send {some message}```  tell the bot to send some discord message.<br><br>
```>> sendfile {file path}```  send a file from the host to discord message.<br><br>
```>> ss```  upload a screenshot of the host desktop to discord message (only works with ```spectacle``` installed).<br><br>
```>> {shell commands} ```  run any shell commands that is available on the host system.<br><br>

## Token:<br>
Token is stored in ```token.json.gpg``` with gpg encryption.<br>
The decryption is done via terminal when you first run the bot.<br>
Json Structure:
```
{
  "token": "your token"
}
```
<br><br>
How to make your token file: <br><br>
1. Make a json file called ```token.json```<br><br>
2. Fill it with this (replace ```"your token"``` with your discrod bot token:<br>
```
{
  "token": "your token"
}
```
<br><br>
4. run:<br>
```gpg -c token.json```<br><br>
5. Fill the password on your liking, then delete ```token.json```.





