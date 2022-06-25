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
                label: '/xp ranking',
                value: 'xp_ranking',
              },{
                label: '/xp reiniciar',
                value: 'xp_reiniciar',
              },
  					]),
			  );
      var embed = new Discord.MessageEmbed()
        .setDescription('**CUADRO DE AYUDA**\n\n**Comando `/xp ver`**')
        .setColor(0xfee75c)
        .addField('¿Qué hace?', 'Muestra al usuario sus niveles en el servidor, si es que el sistema de niveles se encuentra activo')
        .addField('Uso', '`/xp ver`')
        .addField('Permisos bot', 'Ver canales\nEnviar mensajes\nInsertar enlaces', true)
        .addField('Permisos usuario', 'Enviar mensajes\nUsar comandos de aplicaciones', true)
      await interaction.update({embeds: [embed], components:[lista], ephemeral: true})
    } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply") }
  }
}