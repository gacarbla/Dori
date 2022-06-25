const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')
const servidores = new megadb.crearDB('servidores');

module.exports = {
  run: async (client, interaction) => {
    try{
    var usuario = interaction.member
    if(!servidores.has(`${interaction.guild.id}.niveles.estado`)){
      servidores.establecer(`${interaction.guild.id}.niveles`, {estado: "off", max: 25, min:5})
    }
    var estado = await servidores.obtener(`${interaction.guild.id}.niveles.estado`)
    if(estado == "on"){
      try {
        if (!usuarios.has(`${usuario.id}.xp.${interaction.guild.id}.nivel`)) {
          usuarios.establecer(`${usuario.id}.xp.${interaction.guild.id}`, {nivel:0,puntos:0})
        }
        const boton = new Discord.MessageActionRow()
          .addComponents(
    		    new Discord.MessageButton()
    					.setCustomId('xp_reset')
  	  				.setLabel('confirmar')
              .setDisabled(false)
  			  		.setStyle('DANGER')
  		    )
        var embed = new Discord.MessageEmbed()
          .setDescription(`¿Estás segur@ de que quieres reiniciar tus niveles de experiencia?\n**Esta acción será irreversible**`)
          .setColor(0x5865f2)
        await interaction.reply({embeds: [embed], components: [boton], ephemeral: true})
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