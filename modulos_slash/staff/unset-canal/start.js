const Discord = require('discord.js')
const megadb = require('megadb')
const servidores = new megadb.crearDB('servidores')

module.exports = {
  run: async (client, interaction) => {
    try {
      let permiso = interaction.member.permissions.has("ADMINISTRATOR")
      if(!permiso){
        require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
      } else if (permiso) {
        const string = interaction.options.getString('acción');
        servidores.eliminar(`${interaction.guild.id}.canales.${string}`)
        var embed = new Discord.MessageEmbed()
          .setDescription("El canal ha sido eliminado del registro con éxito")
          .setColor(0x5865f2)
        await interaction.reply({embeds: [embed], ephemeral: true})
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}