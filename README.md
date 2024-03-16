# Manjabot
Ravimo's reliable discord terminal bot, best run on docker/container or Virtual Mechine.<br>
This was supposedly ran on Manjaro QEMU, hence the name "Manjabot".<br>

<img src="[http://....jpg](https://raw.githubusercontent.com/RavioliMavioli/manjabot/main/src/assets/git/ss.png)" width="200" height="200" />

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


