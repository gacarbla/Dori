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
        const canal = interaction.options.getChannel('canal');
        const string = interaction.options.getString('acción');
        if (canal.type === 'GUILD_TEXT' || canal.type === 'GUILD_NEWS' || canal.type === 'GROUP_DM' || canal.type === 'GUILD_STORE' || canal.type === 'GUILD_NEWS_THREAD' || canal.type === 'GUILD_PUBLIC_THREAD' || canal.type === 'GUILD_PRIVATE_THREAD') {
          servidores.establecer(`${interaction.guild.id}.canales.${string}`, canal)
          var embed = new Discord.MessageEmbed()
            .setDescription("El canal ha sido guardado con éxito")
            .setColor(0x5865f2)
          await interaction.reply({embeds: [embed], ephemeral: true})
        } else {
          require("../../../modulos_error/start").interact(client, interaction, "55", "no",  "", "reply")
        }
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}