const canvas = require('canvas')
const fs = require("fs")

let blurple = "#5865F2"
let gray = "#2c2f33"
let white = "#ffffff"

const Status = {
  0: "#57F287", // Online
  1: "#FEE75C", // Idle
  2: "#ED4245", // Do not disturb
  3: "#EB459E" // Offline
}

async function GenerateBadge(username, status) {
  let fontSize = 50

  let stext = ""
  switch (status) {
    case 0:
      stext = "Online"
      break;
    case 1:
      stext = "Idle"
      break;
    case 2:
      stext = "Do Not Disturb"
      break
    case 3:
      stext = "Offline"
      break
  }
  let ctt = canvas.createCanvas(1000, 2000).getContext('2d')
  ctt.font = "bold " + fontSize + 'px Segoe UI';
  let ts = ctt.measureText(username).width
  let sts = ctt.measureText(stext).width

  let w = 175 + ts + 45 + sts + 40;
  let h = 126;

  const canva = canvas.createCanvas(w, h)
  const ctx = canva.getContext('2d')

  ctx.fillStyle = blurple
  ctx.fillRect(0, 0, 175 + ts + 5, h);
  ctx.fillStyle = gray
  ctx.fillRect(175 + ts + 5, 0, w - 175 + ts + 5, h);
  ctx.fillStyle = white
  ctx.font = "bold " + fontSize + 'px Segoe UI';
  ctx.fillText(username, 155, h / 2 + fontSize * 0.38)
  ctx.fillStyle = Status[status]
  ctx.fillText(stext, 175 + ts + 45, h / 2 + fontSize * 0.38)

  let image = await canvas.loadImage("./discordicon.png")
  ctx.drawImage(image, 20, h / 2 - 78.16 / 2, 103.8, 78.16)
  return canva
}

async function GenerateBadgeWithoutStatus(username) {
  let fontSize = 50
  let ctt = canvas.createCanvas(1000, 2000).getContext('2d')
  ctt.font = "bold " + fontSize + 'px Segoe UI';
  let ts = ctt.measureText(username).width

  let w = 175 + ts + 5;
  let h = 126;

  const canva = canvas.createCanvas(w, h)
  const ctx = canva.getContext('2d')

  ctx.fillStyle = blurple
  ctx.fillRect(0, 0, 175 + ts + 5, h);
  ctx.fillStyle = gray
  ctx.fillRect(175 + ts + 5, 0, w - 175 + ts + 5, h);
  ctx.fillStyle = white
  ctx.font = "bold " + fontSize + 'px Segoe UI';
  ctx.fillText(username, 155, h / 2 + fontSize * 0.38)

  let image = await canvas.loadImage("./discordicon.png")
  ctx.drawImage(image, 20, h / 2 - 78.16 / 2, 103.8, 78.16)
  return canva
}

async function Render() {
  let canva = await GenerateBadgeWithoutStatus("Av32000#9052")
  canva.createPNGStream().pipe(fs.createWriteStream('result.png'))
}

module.exports = { GenerateBadge, GenerateBadgeWithoutStatus }