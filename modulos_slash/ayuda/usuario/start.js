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
                label: '/usuario confesar',
                value: 'usuario_confesar',
              },{
                label: '/usuario notas eliminar',
                value: 'usuario_notasaliminar',
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
      var titulo = "**CUADRO DE AYUDA**"
      let texto = [
        "\`/usuario confesar\` **::** Confiesa pecador/a",
        "\`/usuario notas eliminar\` **::** Elimina notas",
        "\`/usuario notas escribir\` **::** Escribe una nota",
        "\`/usuario notas leer\` **::** Lee una nota",
        "\`/usuario notas lista\` **::** Lista de notas",
      ]
      texto = texto.sort()
  		var embed = new Discord.MessageEmbed()
  		  .setDescription(`${titulo}\n**Categoría \`/usuario\`**\n\n${texto.join("\n")}`)
  			.setFooter(`${texto.length} comandos`)
  			.setColor(0xfee75c)
      await interaction.reply({embeds: [embed], components:[lista], ephemeral: true})
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
    }
  }
}