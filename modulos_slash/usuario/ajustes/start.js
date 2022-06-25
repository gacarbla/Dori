const Discord = require('discord.js')
const megadb = require("megadb")
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    try {
      var id = interaction.member.id
      var guildId = interaction.guild.id
      if(!usuarios.has(`${id}.notificaciones`)) {
        usuarios.establecer(`${id}.notificaciones`, {})
      }
      const medio = interaction.options.getString('enviar');
      usuarios.establecer(`${interaction.member.id}.ajustes-notificaciones`, {medio: `${medio}`,timestamp: Date.now()})
      var embed = new Discord.MessageEmbed()
        .setDescription("Los ajustes han sido modificados exitosamente")
        .setColor(0x5865f2)
      await interaction.reply({embeds: [embed], ephemeral: true})
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}