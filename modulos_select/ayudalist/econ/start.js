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
                label: '/econ balance',
  						  value: 'econ_balance',
              },{
                label: '/econ buscar-trabajo',
			  			  value: 'econ_buscartrabajo',
              },{
                label: '/econ comprar',
						    value: 'econ_comprar',
              },{
                label: '/econ estudiar',
  						  value: 'econ_estudiar',
              },{
                label: '/econ ingresar',
  						  value: 'econ_ingresar',
              },{
                label: '/econ mochila',
  						  value: 'econ_mochila',
              },{
                label: '/econ ranking',
  						  value: 'econ_ranking',
              },{
                label: '/econ regalar',
  						  value: 'econ_regalar',
              },{
                label: '/econ retirar',
  						  value: 'econ_retirar',
              },{
                label: '/econ robar',
  						  value: 'econ_robar',
              },{
                label: '/econ trabajar',
  						  value: 'econ_trabajar',
              },{
                label: '/econ transferir',
  						  value: 'econ_transferir',
              },{
                label: '/econ usar',
  						  value: 'econ_usar',
              },
  					]),
  			);
      var titulo = "**CUADRO DE AYUDA**"
      let texto = [
        "\`/econ balance\` **::** Balance economía",
        "\`/econ buscar-trabajo\` **::** Buscar trabajo",
        "\`/econ comprar\` **::** Comprar ítem",
        "\`/econ estudiar\` **::** Estudiar profesión",
        "\`/econ ingresar\` **::** Ingresar en el banco",
        "\`/econ mochila\` **::** Recuento ítems",
        "\`/econ ranking\` **::** Ranking de economía",
        "\`/econ regalar\` **::** Regalar un ítem",
        "\`/econ retirar\` **::** Retirar del banco",
        "\`/econ robar\` **::** Balance economía",
        "\`/econ trabajar\` **::** Trabajar",
        "\`/econ transferir\` **::** Transfiere dinero",
        "\`/econ usar\` **::** Usar ítems"
      ]
      texto = texto.sort()
      var embed = new Discord.MessageEmbed()
        .setDescription(`${titulo}\n**Categoría \`/econ\`**\n\n${texto.join("\n")}`)
        .setFooter(`${texto.length} comandos`)
        .setColor(0xfee75c)
      await interaction.update({embeds: [embed], components:[lista], ephemeral: true})
    } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply") }
  }
} 