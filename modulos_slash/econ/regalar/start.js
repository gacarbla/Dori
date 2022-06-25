const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
    run: async (client, interaction) => {
    const usuario = interaction.options.getUser('usuario');
    const item = interaction.options.getString('item');
    usuarios.sumar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 0.5)
    if(!usuario || !item){
      var embed = new Discord.MessageEmbed()
        .setDescription('**ERROR 01**')
        .setFooter('Para ver la definición concreta del error, use el comando /error')
        .setColor(0xed4245)
      await interaction.reply({embeds: [embed], ephemeral: true})
    } else if (!usuarios.has(`${interaction.member.id}.items.${interaction.guild.id}.${item}`)) {
      var embed = new Discord.MessageEmbed()
        .setDescription('Vaya, parece ser que no tienes ese item')
        .setColor(0xed4245)
      await interaction.reply({embeds: [embed], ephemeral: true})
    } else if (!usuarios.has(`${usuario.id}`)){
      var embed = new Discord.MessageEmbed()
        .setDescription('**ERROR 74**\nEsta persona no está registrada.\nPara registrarse sólo tiene que enviar un mensaje en este servidor.')
        .setFooter('Para ver la definición concreta del error, use el comando /error')
        .setColor(0xed4245)
      await interaction.reply({embeds: [embed], ephemeral: true})
    } else {
      usuarios.restar(`${interaction.member.id}.items.${interaction.guild.id}.${item}`, 1)
      if (!usuarios.has(`${usuario.id}.items.${interaction.guild.id}.${item}`)){
        usuarios.establecer(`${usuario.id}.items.${interaction.guild.id}.${item}`, 1)
      } else {
        usuarios.sumar(`${usuario.id}.items.${interaction.guild.id}.${item}`, 1)
      }
      var cantidad = await usuarios.obtener(`${interaction.member.id}.items.${interaction.guild.id}.${item}`)
      if(cantidad===0){
        usuarios.eliminar(`${interaction.member.id}.items.${interaction.guild.id}.${item}`)
      }
      var embed = new Discord.MessageEmbed()
        .setDescription(`Le has regalado 1x **${item}** a <@!${usuario.id}>`)
        .setColor(0x5865f2)
      await interaction.reply({embeds: [embed], ephemeral: true})
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${interaction.member.id}> te ha regalado 1x **${item}**`)
        .setColor(0x5865f2)
      interaction.channel.send({content: `<@!${usuario.id}>`,embeds: [embed]})
    }
  }
}