const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
		try {
	    const lista = new Discord.MessageActionRow()
				.addComponents(
					new Discord.MessageSelectMenu()
						.setCustomId('ayudalist')
						.setPlaceholder('Categoría')
						.addOptions([
							{
								label: '/bot',
								value: 'bot',
							},
							{
								label: '/econ',
								value: 'econ',
							},
							{
								label: '/error',
								value: 'error',
							},
							{
								label: '/gif',
								value: 'gif',
							},
							{
								label: '/miscelánico',
								value: 'miscelanico',
							},
							{
								label: '/servidor',
								value: 'servidor',
							},
							{
								label: '/staff',
								value: 'staff',
							},
	            {
								label: '/usuario',
								value: 'usuario',
							},
							{
								label: "/xp",
								value: "xp"
							}
						]),
				);
			var titulo = "**CUADRO DE AYUDA**"
			texto = [
				"`/bot` **::** Información y estado del bot",
				"`/econ` **::** Economía del servidor",
				"`/error` **::** Descripción y reporte de errores",
				"`/gif` **::** Acciones y reacciones con gifs",
				"`/miscelánico` **::** Miscelánico",
				"`/servidor` **::** Ajustes e información del servidor",
				"`/staff` **::** Comandos de **staff**",
				"`/usuario` **::** Comandos de usuarios",
				"`/xp` **::** Comandos de niveles"
			]
	    var embed = new Discord.MessageEmbed()
	      .setDescription(titulo+'\n\n**» Categorías**\n'+texto.join("\n"))
	      .setFooter(`${texto.length} categorías | +80 comandos`)
				.setColor(0xfee75c)
	    await interaction.reply({embeds: [embed], components:[lista], ephemeral: true}).catch((e)=>{
				require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply")
			})
		} catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply") }
  }
}