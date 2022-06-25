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
              },{
						    label: '/servidor info',
						    value: 'servidor_info',
              },
					  ]),
			  );
      let texto = [
        "\`/servidor yo\` **::** Obtén tu información",
        "\`/servidor info\` **::** Información del servidor"
      ]
      texto = texto.sort()
      var embed = new Discord.MessageEmbed()
        .setDescription('**CUADRO DE AYUDA**\nComandos `/servidor`.\n\n'+texto.join("\n"))
        .setFooter(`${texto.length} comandos`)
        .setColor(0xfee75c)
      await interaction.update({embeds: [embed], components:[lista], ephemeral: true}).catch(()=>{
        require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply")
      })
    } catch {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply")
    }
  }
}