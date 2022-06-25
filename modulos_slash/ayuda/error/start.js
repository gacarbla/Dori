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
                label: '/error reportar',
  						  value: 'error_reportar',
              },{
  						  label: '/error significado',
  						  value: 'error_significado',
              },
  					]),
  		  );
      let texto = [
        "\`/error reportar\` **::** Reportar errores",
        "\`/error significado\` **::** Buscar el significado de un error"
      ]
      var embed = new Discord.MessageEmbed()
        .setDescription('**CUADRO DE AYUDA**\nComandos `/error`.\n\n'+texto.join("\n"))
        .setFooter(`${texto.length} comandos`)
        .setColor(0xfee75c)
      await interaction.reply({embeds: [embed], components:[lista], ephemeral: true}).catch((e)=>{
        require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply")
      })
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply")
    }
  }
}