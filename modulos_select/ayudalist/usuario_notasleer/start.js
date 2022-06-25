const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
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
              label: '/usuario confesar',
              value: 'usuario_confesar',
            },{
              label: '/usuario notas eliminar',
							value: 'usuario_notaseliminar',
            },{
              label: '/usuario notas escribir',
							value: 'usuario_notasescribir',
            },{
              label: '/usuario notas lista',
							value: 'usuario_notaslista',
            }
					]),
			);
    var embed = new Discord.MessageEmbed()
      .setDescription('**CUADRO DE AYUDA**\n\n**Comando `/usuario notas leer`**')
      .setColor(0xfee75c)
      .addField('¿Qué hace?', 'Busca una nota existente para que puedas leerla')
      .addField('Uso', '`/usuario notas leer <código> <visibilidad>`')
      .addField('Permisos bot', 'Ver canales\nEnviar mensajes\nInsertar enlaces', true)
      .addField('Permisos usuario', 'Enviar mensajes\nUsar comandos de aplicaciones', true)
    await interaction.update({embeds: [embed], components:[lista], ephemeral: true})
  }
}