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
              label: '/miscelánico 8ball',
						  value: 'miscelánico_ball',
            },{
              label: '/miscelánico aleatorio',
						  value: 'miscelánico_aleatorio',
            },{
						  label: '/miscelánico amor',
						  value: 'miscelánico_amor',
            },{
							label: '/miscelánico anime',
							value: 'miscelánico_anime',
						},{
							label: '/miscelánico color rgb',
							value: 'miscelánico_colorrgb',
						},{
							label: '/miscelánico escoge',
							value: 'miscelánico_escoge',
						},{
							label: '/miscelánico minecraft-servidor',
							value: 'miscelánico_minecraftservidor',
						},{
							label: '/miscelánico minecraft-skin',
							value: 'miscelánico_minecraftskin',
						},{
							label: '/miscelánico roblox-avatar',
							value: 'miscelánico_robloxavatar',
						}
					]),
			);
    var embed = new Discord.MessageEmbed()
      .setDescription('**CUADRO DE AYUDA**\n\n**Comando `/miscelánico color hex`**')
      .setColor(0xfee75c)
      .addField('¿Qué hace?', 'Obtén un color introduciendo su código HEX.')
      .addField('Uso', '`/miscelánico color hex <código> <visibilidad>`')
      .addField('Permisos bot', 'Ver canales\nEnviar mensajes\nInsertar enlaces', true)
      .addField('Permisos usuario', 'Enviar mensajes\nUsar comandos de aplicaciones', true)
    await interaction.update({embeds: [embed], components:[lista], ephemeral: true})
  }
}