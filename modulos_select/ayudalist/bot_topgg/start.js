const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    try {
      const lista = new Discord.MessageActionRow()
  			.addComponents(
  				new Discord.MessageSelectMenu()
  					.setCustomId('ayudalist')
  					.setPlaceholder('Comando')
  					.addOptions([
              {
                label: 'Volver',
                description: 'Volver al menú principal',
  						  value: 'volver',
  						  emoji: {
  							id: "892449750538924032",
  							name: "atras"
  						  }
              },{
                label: '/bot info',
  						  value: 'bot_info',
              },{
  						  label: '/bot invitar',
  						  value: 'bot_invitar',
              },{
								label: "/bot normas",
								value: "bot_normas"
							},{
  							label: '/bot ping',
  							value: 'bot_ping',
  						},{
  							label: '/bot sugerencia',
  							value: 'bot_sugerencia',
  						},{
  							label: '/bot versión',
  							value: 'bot_versión',
  						},
  					]),
  			);
      var embed = new Discord.MessageEmbed()
        .setDescription('**CUADRO DE AYUDA**\n\n**Comando `/bot topgg`**')
        .setColor(0xfee75c)
        .addField('¿Qué hace?', 'Dori te envía un embed con un link gracias al cuál puedes encontrarle en [TopGG](https://top.gg)')
        .addField('Uso', '`/bot topgg`')
        .addField('Permisos bot', 'Ver canales\nEnviar mensajes\nInsertar enlaces', true)
        .addField('Permisos usuario', 'Enviar mensajes\nUsar comandos de aplicaciones', true)
      await interaction.update({embeds: [embed], components:[lista], ephemeral: true}).catch(()=>{return})
    } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply") }
  }
}