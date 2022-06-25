const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')
const servidores = new megadb.crearDB('servidores');

module.exports = {
  run: async (client, interaction) => {
    try{
    var usuario = interaction.options.getMember('usuario') || interaction.member
    if(!servidores.has(`${interaction.guild.id}.niveles.estado`)){
      servidores.establecer(`${interaction.guild.id}.niveles`, {estado: "off", max: 25, min:5})
    }
    var estado = await servidores.obtener(`${interaction.guild.id}.niveles.estado`)
    if(estado == "on"){
      try {
        if (!usuarios.has(`${usuario.id}.xp.${interaction.guild.id}.nivel`)) {
          usuarios.establecer(`${usuario.id}.xp.${interaction.guild.id}`, {nivel:0,puntos:0})
        }
        var xp = await usuarios.obtener(`${usuario.id}.xp.${interaction.guild.id}.puntos`)
        var embed = new Discord.MessageEmbed()
          .setDescription(`<@!${usuario.id}>`)
          .addField(`Puntos:`, `${xp} XP`, false)
          .setFooter("Estamos trabajando para mejorar la estética de este comando")
          .setColor(0x5865f2)
        await interaction.reply({embeds: [embed], ephemeral: true})
      } catch {
        require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
      }
    } else {
      var embed = new Discord.MessageEmbed()
        .setDescription(`Este servidor tiene el sistema de niveles de Dori desactivado.`)
        .setColor(0xed4245)
      await interaction.reply({embeds: [embed], ephemeral: true})
    }
    } catch (e) {
      
      // Enviar mensaje de error
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
    
    };
  }
}