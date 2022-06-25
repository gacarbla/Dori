const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')
const servidores = new megadb.crearDB('servidores');

module.exports = {
  run: async (client, interaction) => {
    try{
    var usuario = interaction.member
      try {
        if (!usuarios.has(`${usuario.id}.xp.${interaction.guild.id}.nivel`)) {
          usuarios.establecer(`${usuario.id}.xp.${interaction.guild.id}`, {nivel:0,puntos:0})
        }
        const boton = new Discord.MessageActionRow()
          .addComponents(
    		    new Discord.MessageButton()
    					.setCustomId('xp_reset')
  	  				.setLabel('confirmar')
              .setDisabled(true)
  			  		.setStyle('DANGER')
  		    )
        var embed = new Discord.MessageEmbed()
          .setDescription(`Se ha eliminado exitosamente todos los datos de niveles referentes a este servidor por parte del usuario ${usuario.id}\nHora de realización: <t:${Math.floor(Date.now()/1000)}:d> a las <t:${Math.floor(Date.now()/1000)}:t> (<t:${Math.floor(Date.now()/1000)}:R>)`)
          .setColor(0x5865f2)
        await interaction.update({embeds: [embed], components: [boton], ephemeral: true})
        usuarios.eliminar(`${usuario.id}.xp.${interaction.guild.id}`)
      } catch {
        require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
      }
    } catch (e) {
      
      // Enviar mensaje de error
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
    
    };
  }
}