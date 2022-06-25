const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    try {
      const usuario = interaction.options.getMember('usuario');
      if(!usuarios.has(`${usuario.id}.advertencias.${interaction.guild.id}`)){
        var embed = new Discord.MessageEmbed()
          .setDescription('Esta persona no tiene advertencias')
          .setColor(0x5865f2)
        await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
      } else {
        var advertencias_n = await usuarios.obtener(`${usuario.id}.advertencias.${interaction.guild.id}.numero`)
        var advertencias_l = await usuarios.obtener(`${usuario.id}.advertencias.${interaction.guild.id}.motivos`)
        var embed = new Discord.MessageEmbed()
          .setDescription(`Advertencias de <@!${usuario.id}>`)
          .addField('Número:', `${advertencias_n}`)
          .addField('Motivos de advertencias:', `- ${advertencias_l.join('\n- ')}`)
          .setColor(0x5865f2)
        await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}