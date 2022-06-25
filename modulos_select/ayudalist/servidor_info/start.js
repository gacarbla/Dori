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
                label: '/servidor yo',
						    value: 'servidor_yo',
              }
					  ]),
			  );
      var embed = new Discord.MessageEmbed()
        .setDescription('**CUADRO DE AYUDA**\n\n**Comando `/servidor info`**')
        .setColor(0xfee75c)
        .addField('¿Qué hace?', 'Muestra la información del servidor.')
        .addField('Uso', '`/servidor info`')
        .addField('Permisos bot', 'Ver canales\nEnviar mensajes\nInsertar enlaces', true)
        .addField('Permisos usuario', 'Enviar mensajes\nUsar comandos de aplicaciones\nGestionar servidor', true)
      await interaction.update({embeds: [embed], components:[lista], ephemeral: true})
    } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply") }
  }
}