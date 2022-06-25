const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    const usuario = interaction.options.getMember('usuario');
    const cantidad = interaction.options.getInteger('cantidad');
    if(!usuario || !cantidad){
      var embed = new Discord.MessageEmbed()
        .setDescription('**ERROR 01**')
        .setFooter('Para ver la definición concreta del error, use el comando /error')
        .setColor(0xed4245)
      await interaction.reply({embeds: [embed], ephemeral: true})
    } else {
      try {
        var banco = await usuarios.obtener(`${interaction.member.id}.dinero.${interaction.guild.id}.banco`)
        if(banco<cantidad){
          var embed = new Discord.MessageEmbed()
            .setDescription('**ERROR 14**\nNo tienes tanto dinero en tu cuenta')
            .setFooter('Para ver la definición concreta del error, use el comando /error')
            .setColor(0xed4245)
          await interaction.reply({embeds: [embed], ephemeral: true})
        } else if (cantidad<1) {
          var embed = new Discord.MessageEmbed()
            .setDescription('**ERROR 13**\nNo se puede transferir esta cantidad de dinero')
            .setFooter('Para ver la definición concreta del error, use el comando /error')
            .setColor(0xed4245)
          await interaction.reply({embeds: [embed], ephemeral: true})
        } else if (!usuarios.has(`${interaction.member.id}.dinero.${interaction.guild.id}.banco`)) {
          var embed = new Discord.MessageEmbed()
            .setDescription('**ERROR 01**')
            .setFooter('Para ver la definición concreta del error, use el comando /error')
            .setColor(0xed4245)
          await interaction.reply({embeds: [embed], ephemeral: true})
        } else if (!usuarios.has(`${usuario.id}.dinero.${interaction.guild.id}.banco`)){
          var embed = new Discord.MessageEmbed()
            .setDescription('**ERROR 74**\nEsta persona no está registrada.\nPara registrarse sólo tiene que enviar un mensaje en este servidor.')
            .setFooter('Para ver la definición concreta del error, use el comando /error')
            .setColor(0xed4245)
          await interaction.reply({embeds: [embed], ephemeral: true})
        } else {
          try {
            usuarios.sumar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 0.2)
            usuarios.restar(`${interaction.member.id}.dinero.${interaction.guild.id}.banco`, `${cantidad}`)
            usuarios.sumar(`${usuario.id}.dinero.${interaction.guild.id}.banco`, `${cantidad}`)
            var embed = new Discord.MessageEmbed()
              .setDescription(`Has perdido dinero, pero has ganado...\nLa verdad no sé que has ganado   . _.`)
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true})
            var embed = new Discord.MessageEmbed()
              .setDescription(`**${interaction.user.username}** te ha transferido \`${cantidad} ₪\``)
              .setColor(0x5865f2)
            interaction.channel.send({content: `<@!${usuario.id}>`,embeds: [embed]}).catch(()=>{return})
          } catch {
            var embed = new Discord.MessageEmbed()
              .setDescription('**ERROR 72**')
              .setFooter('Para ver la definición concreta del error, use el comando /error')
              .setColor(0xed4245)
            await interaction.reply({embeds: [embed], ephemeral: true})
          }
        }
      }catch {
        var embed = new Discord.MessageEmbed()
          .setDescription('**ERROR 72**\nVuelva a intentarlo más tarde')
          .setFooter('Para ver la definición concreta del error, use el comando /error')
          .setColor(0xed4245)
        await interaction.reply({embeds: [embed], ephemeral: true})
      }
    }
  }
}