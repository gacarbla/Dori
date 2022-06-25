const Discord = require('discord.js')
const megadb = require('megadb')
const servidores = new megadb.crearDB('servidores')

module.exports = {
  run: async (client, interaction) => {
    try {
    let perm = interaction.member.permissions.has('ADMINISTRATOR')||interaction.member.id==='643575943289634836'
    if(!perm){
      require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
    } else {
          try {
            servidores.eliminar(`${interaction.guild.id}.verify`)
            var embed = new Discord.MessageEmbed()
                .setDescription(`Se ha borrado el sistema de verificación exitosamente.`)
                .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true }).catch(()=>{return})
          } catch {
            require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
          }
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}