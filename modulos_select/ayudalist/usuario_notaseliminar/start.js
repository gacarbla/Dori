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
              label: '/usuario notas escribir',
							value: 'usuario_notasescribir',
            },{
              label: '/usuario notas leer',
							value: 'usuario_notasleer',
            },{
              label: '/usuario notas lista',
							value: 'usuario_notaslista',
            }
					]),
			);
    var embed = new Discord.MessageEmbed()
      .setDescription('**CUADRO DE AYUDA**\n\n**Comando `/usuario notas eliminar`**')
      .setColor(0xfee75c)
      .addField('¿Qué hace?', 'Elimina una nota.\nRecuerda que sólo puedes borrar tus notas, y la administración del servidor puede borrar las notas que hayas publicado para sólo el servidor aún que las protejas con contraseña.')
      .addField('Uso', '`/usuario notas eliminar <código>`')
      .addField('Permisos bot', 'Ver canales\nEnviar mensajes\nInsertar enlaces', true)
      .addField('Permisos usuario', 'Enviar mensajes\nUsar comandos de aplicaciones', true)
    await interaction.update({embeds: [embed], components:[lista], ephemeral: true})
  }
}