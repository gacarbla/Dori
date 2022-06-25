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
                label: '/xp ver',
                value: 'xp_ver',
              },{
                label: '/xp reiniciar',
                value: 'xp_reiniciar',
              },
  					]),
			  );
      var embed = new Discord.MessageEmbed()
        .setDescription('**CUADRO DE AYUDA**\n\n**Comando `/xp ranking`**')
        .setColor(0xfee75c)
        .addField('¿Qué hace?', 'Muestra una lista con los usuarios con más niveles del servidor')
        .addField('Uso', '`/xp ranking`')
        .addField('Permisos bot', 'Ver canales\nEnviar mensajes\nInsertar enlaces', true)
        .addField('Permisos usuario', 'Enviar mensajes\nUsar comandos de aplicaciones', true)
      await interaction.update({embeds: [embed], components:[lista], ephemeral: true})
    } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply") }
  }
}