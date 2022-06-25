const Discord = require('discord.js')
const package = require('../../../package.json')
var megadb = package.dependencies.megadb
module.exports = {
  run: async (client, interaction) => {
    try {
      var npm_l = Object.keys(package.dependencies).length
      var npms = Object.keys(package.dependencies)
      npms = npms.sort()
      var npm = []
      var i = 0
      for (i=0;i<npm_l;i++){
        var dependence = package.dependencies[`${npms[i]}`]
        npm.push(`${npms[i]} (${dependence.slice(1)})`)
      }
      // Establece un nuevo embed
      var embed = new Discord.MessageEmbed()
        .setAuthor(`INFORMACIÓN DE ${client.user.username.toUpperCase()}`, `${client.user.avatarURL()}`)
        .addField('Nombre:', `${client.user.username}`, true)
        .addField('ID:', `${client.user.id}`, true)
        .addField('En el servidor:', `<@!${client.user.id}>`, true)
        .addField('Usuarios:', `${client.users.cache.size} (BOTs + Personas)`, true)
        .addField('Canales:', `${client.channels.cache.size}`, true)
        .addField('Servidores:', `${Math.floor(client.guilds.cache.filter(u => !u.bot ).size+2)}`, true)
        .addField('Programado en:', `JavaScript (Node.js)`, true)
        .addField('Versión BOT:', `${require("../../../ajustes.json").version}`, true)
        .addField('Versión Node.js:', `17.2.0`, true)
        .addField('NPMs:', `${npm.join("\n")}`, true)
        .addField('Programadores:', "gacarbla#9399", true)
        .addField('** **', '** **', true)
        .setColor(0x5865f2)
      // Intenta enviar el embed y si no es capaz envía error 05
      await interaction.reply({ embeds: [embed], ephemeral: true }).catch((e)=>{
        require("../../../modulos_error/start").interact(client, interaction, "05", "si",  e, "reply");
      })
    } catch (e) {

      // Envía un mensaje de error
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");

    }
  }
}