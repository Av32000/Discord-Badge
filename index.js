const Discord = require("discord.js")
const dotenv = require("dotenv")
const express = require("express")

const { GenerateBadge, GenerateBadgeWithoutStatus, GenerateJSON } = require("./badge")

const app = express()

const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildPresences, Discord.GatewayIntentBits.GuildMembers] })
dotenv.config()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})
client.login(process.env.TOKEN)
async function GetUser(id, callback) {
  const user = await (await fetch("https://discord.com/api/v10/users/" + id, { headers: { "Authorization": "Bot " + process.env.TOKEN } })).json()
  var itemsProcessed = 0;
  await client.guilds.cache.get(process.env.GUILD_ID).presences.cache.forEach(element => {
    itemsProcessed++;
    if (element.userId == id) {
      callback({ username: user.global_name || element.user.tag, status: element.status })
      itemsProcessed = 0
    }
    if (itemsProcessed === client.guilds.cache.get(process.env.GUILD_ID).memberCount) {
      callback(null);
    }
  })
}

app.get("/badge/status/:id", async (req, res) => {
  GetUser(req.params.id, async (data) => {
    if (!data) {
      res.status(404).send("Sorry... We couldn't find this user. Please verify that you have joined the following Discord server: https://discord.gg/FM8MxRra9P. If the problem persists, please open an issue at https://github.com/Av32000/Discord-Badge/issues")
      return
    }
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
      if (req.query.json == "true") {
        return res.send(GenerateJSON(data.username, sint))
      }
      canva = await GenerateBadge(data.username, sint)
    }
    canva.createPNGStream().pipe(res)
  })
})

app.get("/badge/:id", async (req, res) => {
  GetUser(req.params.id, async (data) => {
    if (!data) {
      res.send("Sorry... We couldn't find this user. Please verify that you have joined the following Discord server: https://discord.gg/FM8MxRra9P. If the problem persists, please open an issue at https://github.com/Av32000/Discord-Badge/issues")
      return
    }
    let canva = await GenerateBadgeWithoutStatus(data.username)
    canva.createPNGStream().pipe(res)
  })
})

app.get("/", (req, res) => {
  res.redirect("https://github.com/Av32000/Discord-Badge")
})

app.all('*', function (req, res) {
  res.sendStatus(404);
});

app.listen(8080, () => {
  console.log("Github Discord Badge listening on port 8080...")
})