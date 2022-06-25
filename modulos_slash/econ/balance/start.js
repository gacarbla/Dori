const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    try{
    var usuario = interaction.options.getMember('usuario') || interaction.member
    if(usuarios.has(`${usuario.id}.dinero.${interaction.guild.id}`)){
      try {
        var dinero = await usuarios.obtener(`${usuario.id}.dinero.${interaction.guild.id}.cartera`)
        var banco = await usuarios.obtener(`${usuario.id}.dinero.${interaction.guild.id}.banco`)
        var embed = new Discord.MessageEmbed()
          .setDescription(`<@!${usuario.id}>`)
          .addField(`:moneybag: Dinero`, `${dinero} ₪`, false)
          .addField(`:atm: Banco`, `${banco} ₪`, false)
          .setColor(0x5865f2)
        await interaction.reply({embeds: [embed], ephemeral: true})
      } catch {
        var embed = new Discord.MessageEmbed()
          .setDescription('**ERROR 72**')
          .setFooter('Para ver la definición concreta del error, use el comando /error')
          .setColor(0xed4245)
        await interaction.reply({embeds: [embed], ephemeral: true})
      }
    } else {
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${usuario.id}>`)
        .addField(`:moneybag: Dinero`, `50 ₪`, false)
        .addField(`:atm: Banco`, `950 ₪`, false)
        .setColor(0x5865f2)
      await interaction.reply({embeds: [embed], ephemeral: true})
    }
    } catch (e) {
      
      // Enviar mensaje de error
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
    
    };
  }
}