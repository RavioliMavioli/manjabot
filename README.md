# Manjabot
Ravimo's reliable discord terminal bot.<br>
Control your PC via discord bot, for example you type ">> neofetch", it will print neofetch of the system you are in! <br>
So basically ssh with 0 security. <br><br>
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
Run ```>> help``` display bot commands.

## Token:<br>
Token is stored in ```src/assets/manjakey.json.gpg``` with gpg encryption.<br>
The decryption is done via terminal when you first run the bot.<br>
Json Structure:
```
{
  bot_token: "your token"
}
```


