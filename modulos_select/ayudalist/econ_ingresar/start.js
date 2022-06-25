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
      var embed = new Discord.MessageEmbed()
        .setDescription('**CUADRO DE AYUDA**\n\n**Comando `/econ ingresar`**')
        .setColor(0xfee75c)
        .addField('¿Qué hace?', 'Con este comando podrás ingresar el dinero de tu cartera al banco para que no te lo puedan robar.')
        .addField('Uso', '`/econ ingresar <cantidad>`')
        .addField('Permisos bot', 'Ver canales\nEnviar mensajes\nInsertar enlaces', true)
        .addField('Permisos usuario', 'Enviar mensajes\nUsar comandos de aplicaciones', true)
      await interaction.update({embeds: [embed], components:[lista], ephemeral: true})
    } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply") }
  }
}