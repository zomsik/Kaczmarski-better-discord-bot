# Kaczmarski - discord bot

## What it is?
This is a discord bot mostly concentrated on playing music on discord channels. His name is after Jacek Kaczmarski - Polish Bard of Solidarity who died in 2004.
He is able to play any song from youtube or spotify, but also has a database of all his namesake songs that can be randomly played. This is second version of this bot, [previous bot](https://github.com/zomsik/Kaczmar---Discord-music-bot "Previous version of bot") was written on deprecated version of Discord API which generated after time serious errors. New version of Kaczmarski doesn't require Youtube API Token anymore and uses other stream engine.

## How to run it?
1. Simply clone this repository.
2. Create new discord bot in discord developer site and give it "bot" privileges.
3. Create ".env" file in the root directory and complete it with your TOKEN and CLIENT_ID like below:
```sh
TOKEN=YOUR_DISCORD_BOT_TOKEN
CLIENT_ID=YOUR_DISCORD_BOT_CLIENT_ID
PORT=YOUR_PORT_TO_LISTEN_FOR_API_REQUESTS
```
4. Open terminal and install all required node modules.
```sh
npm install
```
5. Run the bot with:
```sh
npm start
```
command or host it on site like Heroku. It is possible to host a  docker container from built image on Microsoft Azure as well.

## Usage
Bot uses slash commands, so it gives opportunity to write short description of every single command. Type "/" on chat and all of bot's commands will display on screen. Additionaly you can type "/help" command to get message from bot about usage of basic commands.

## API
Bot can be controlled by REST API after activating it on server with `/activate_api <ON|OFF>`.  It is possible to remotely track and skip current song or change volume. Example request is shown below:
```
localhost:80/api/skipSong?guild=772230530045444137&apipassword=test&channel=772230530623733792
```
Property `guild` is a server id and defines to which server we are sending request.  `channel` is optional channel id value and allows to send message on chat after succesful request. `apipassword` is only needed if discord administrator set it with `/set_api_password <password|NULL>` slash command. For changing volume we have keys `operation=add|sub|set` and `volume=0-100`.

## License
This code and bot is free to use and has MIT license.

## Author
The author of the repository is [Tomasz Wiejak](https://github.com/zomsik "Github profile").