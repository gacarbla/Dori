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
  							label: '/bot topgg',
  							value: 'bot_topgg',
  						},{
  							label: '/bot versión',
  							value: 'bot_versión',
  						},
  					]),
  			);
			var titulo = "**CUADRO DE AYUDA**"
			let texto = [
				"\`/bot info\` **::** Información",
				"\`/bot invitar\` **::** Invitación del bot",
				"`/bot normas` **::** Términos y condiciones de uso de Dori",
				"\`/bot ping\` **::** Ping API Discord",
				"\`/bot sugerencia\` **::** Sugerir un cambio",
				"\`/bot topgg\` **::** [TopGG](https://top.gg)",
			  "\`/bot versión\` **::** Versión del bot",
			]
			texto = texto.sort()
			var embed = new Discord.MessageEmbed()
				.setDescription(`${titulo}\n**Categoría \`/bot\`**\n\n${texto.join("\n")}`)
				.setFooter(`${texto.length} comandos`)
				.setColor(0xfee75c)
      await interaction.reply({embeds: [embed], components:[lista], ephemeral: true}).catch(()=>{return})
    } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply") }
  }
};