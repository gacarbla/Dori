const Discord = require('discord.js')
const megadb = require('megadb')
const servidores = new megadb.crearDB('servidores')

module.exports = {
  run: async (client, interaction) => {
    var modulo = interaction.options.getString('categoría');
    try {
      let perm = interaction.member.permissions.has('ADMINISTRATOR') || interaction.member.id === 643575943289634836
      if(!perm) {
        require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
      } else {
        if(!servidores.has(`${interaction.guild.id}.deshabilitado.mdl`)){
          servidores.establecer(`${interaction.guild.id}.deshabilitado.mdl`, {})
        }
        if(!servidores.has(`${interaction.guild.id}.deshabilitado.cmd`)){
          servidores.establecer(`${interaction.guild.id}.deshabilitado.cmd`, {})
        }
        if (servidores.has(`${interaction.guild.id}.deshabilitado.mdl.${modulo}`)) {
          try {
            var embed = new Discord.MessageEmbed()
              .setDescription(`El módulo **${modulo}** ha sido habilitado.\nTodos los roles pueden usarlo.`)
              .setColor(0x5865f2)
            try {
              servidores.eliminar(`${interaction.guild.id}.deshabilitado.mdl.${modulo}`)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            } catch (e) {
              require("../../../modulos_error/start").interact(client, interaction, "97", "si",  e, "reply")
            }
          } catch (e) {
            require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
          }
        } else {
          try{servidores.eliminar(`${interaction.guild.id}.deshabilitado.mdl.${modulo}`)}catch{return}
          var embed = new Discord.MessageEmbed()
            .setDescription('Vaya, este módulo ya estaba habilitado')
            .setColor(0x5865f2)
          await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
        }
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}