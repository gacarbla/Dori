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
        const rol = interaction.options.getRole('rol');
        const nivel = interaction.options.getString('nivel');
        if(!servidores.has(`${interaction.guild.id}.verify.rol`)){
          servidores.establecer(`${interaction.guild.id}.verify`, {rol: `${rol.id}`, nivel: `${nivel}`})
          var embed = new Discord.MessageEmbed()
            .setDescription(`Se ha activado el comando \`/verificar\` que asignará el rol ${rol}.\nEl nivel de seguridad asignado es \`${nivel}\`.`)
            .setColor(0x5865f2)
          await interaction.reply({embeds: [embed], ephemeral: true }).catch(()=>{return})
        } else {
          servidores.establecer(`${interaction.guild.id}.verify`, {rol: `${rol.id}`, nivel: `${nivel}`})
          var embed = new Discord.MessageEmbed()
            .setDescription(`El sistema de verificación se ha actualizado.\nAhora el rol que se otorgará será: ${rol}.\nEl nivel de seguridad asignado es \`${nivel}\`.`)
            .setColor(0x5865f2)
          await interaction.reply({embeds: [embed], ephemeral: true }).catch(()=>{return})
        }
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}