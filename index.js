const Discord = require("discord.js")
const dotenv = require("dotenv")

const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildPresences, Discord.GatewayIntentBits.GuildMembers] })
dotenv.config()

async function GetUserStatus(id, callback) {
  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.guilds.cache.get(process.env.GUILD_ID).presences.cache.forEach(element => {
      if (element.userId == id) callback(element.status)
    });
    client.destroy()
  })
  client.login(process.env.TOKEN);
}

GetUserStatus("593436735380127770", (status) => {
  console.log(status)
})