FROM manjarolinux/base
RUN pacman -Sy --noconfirm neofetch nodejs npm sudo wget
RUN useradd manjabot -m && echo "yeet" | passwd --stdin manjabot

WORKDIR /manjabot
COPY package*.json .
RUN npm install

COPY . .
RUN chmod 777 /manjabot && chmod 777 * && chmod 777 /home/manjabot
USER manjabot

CMD [ "node", "/manjabot/index.js", "--sudo=password", "--token=gpg_password", "--cai=gpg_password"]
