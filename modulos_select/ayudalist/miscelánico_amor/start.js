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
							label: '/miscelánico anime',
							value: 'miscelánico_anime',
						},{
							label: '/miscelánico color hex',
							value: 'miscelánico_colorhex',
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
      .setDescription('**CUADRO DE AYUDA**\n\n**Comando `/miscelánico amor`**')
      .setColor(0xfee75c)
      .addField('¿Qué hace?', 'Haz un shipeo express.\nSi no especificas un segundo usuario, el bot supondrá que eres tú mism@')
      .addField('Uso', '`/miscelánico amor <usuario1> [usuario2]`')
      .addField('Permisos bot', 'Ver canales\nEnviar mensajes\nInsertar enlaces', true)
      .addField('Permisos usuario', 'Enviar mensajes\nUsar comandos de aplicaciones', true)
    await interaction.update({embeds: [embed], components:[lista], ephemeral: true})
  }
}