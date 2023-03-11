# Discord Badge

An API to easly generate Discord badge with (or without) your status.

## Installation

To install the bot, follow this steps :

1. Create an app on Discord Dev Portal
2. Invite the bot to your Discord server
3. Clone the repo
4. Install Packages
5. Create `.env` file with :
```
TOKEN=[BOT_TOKEN]
GUILD_ID=[GUILD_ID]
```
6. Run `node index.js`

## Usage
The API is very simple. There are 3 path :
- `/` => Redirect to this repo
- `/badge/status/[USER_ID]` => Genreate a badge with the status of the user
- `/badge/[USER_ID]` => Generate a badge only with the username

## Exemples
![Username_Status](https://raw.githubusercontent.com/Av32000/Discord-Badge/main/src/Status.png)
![Username](https://raw.githubusercontent.com/Av32000/Discord-Badge/main/src/User.png)
