# Manjabot
Control your PC/Container/VM via discord bot, for example you type ```>> neofetch```,<br>
it will print neofetch of the system you are in! <br><br>
So, basically ```ssh``` with 0 security. <br><br>
Best ran on a docker/container or a Virtual Mechine for security reasons. <br>
This was supposedly ran on Manjaro QEMU, hence the name "Manjabot".<br>

<img src="https://raw.githubusercontent.com/RavioliMavioli/manjabot/main/src/assets/git/ss.png" width="512" height="auto" />

## Installation:
```
git clone https://github.com/RavioliMavioli/manjabot
cd manjabot
npm install
./run.sh
```

## Commands:<br>
```>> help```  displays bot commands.<br><br>
```>> changepass {new sudo password}```  change input of the sudo password.<br><br>
```>> send {some message}```  tell the bot to send some discord message.<br><br>
```>> sendfile {file path}```  send a file from the host to discord message.<br><br>
```>> upload_ss```  upload a screenshot of the host desktop to discord message (only works with ```spectacle``` installed).<br><br>
```>> {shell commands} ```  run any shell commands that is available on the host system.<br><br>

## Token:<br>
Token is stored in ```src/assets/manjakey.json.gpg``` with gpg encryption.<br>
The decryption is done via terminal when you first run the bot.<br>
Json Structure:
```
{
  bot_token: "your token"
}
```
<br><br>
How to make your token file: <br><br>
1. Go to ```src/assets/``` <br><br>
2. Make a json file called ```manjakey.json```<br><br>
3. Fill it with this (replace ```"your token"``` with your discrod bot token:<br>
```
{
  bot_token: "your token"
}
```
<br><br>
4. On the directory you are in (```src/assets/```), run:<br>
```gpg -c manjakey.json```<br><br>
5. Fill the password on your liking, then delete ```manjakey.json```.





