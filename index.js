const Discord = require("discord.js")
const dotenv = require("dotenv")
const express = require("express")

const { GenerateBadge, GenerateBadgeWithoutStatus } = require("./badge")

const app = express()

const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildPresences, Discord.GatewayIntentBits.GuildMembers] })
dotenv.config()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})
client.login(process.env.TOKEN)
async function GetUser(id, callback) {
  client.guilds.cache.get(process.env.GUILD_ID).presences.cache.forEach(element => {
    if (element.userId == id) callback({ username: element.user.tag, status: element.status })
  });
}

app.get("/badge/status/:id", async (req, res) => {
  GetUser(req.params.id, async (data) => {
    let sint = 5
    switch (data.status) {
      case "online":
        sint = 0
        break;
      case "idle":
        sint = 1
        break;
      case "dnd":
        sint = 2
        break
      case "offline":
        sint = 3
        break
    }
    let canva = null
    if (sint == 5) {
      canva = await GenerateBadgeWithoutStatus(data.username)
    } else {
      canva = await GenerateBadge(data.username, sint)
    }
    canva.createPNGStream().pipe(res)
  })
})

app.get("/badge/:id", async (req, res) => {
  GetUser(req.params.id, async (data) => {
    let canva = await GenerateBadgeWithoutStatus(data.username)
    canva.createPNGStream().pipe(res)
  })
})

app.listen(8080, () => {
  console.log("Github Discord Badge listening on port 8080...")
})