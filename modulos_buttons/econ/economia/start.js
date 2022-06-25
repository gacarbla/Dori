const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios_db = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    try {
      let productos = []
      if(usuarios_db.has(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)){
        var dinero = await usuarios_db.obtener(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)
        if (dinero>9999){
          productos.push({label: "Amuleto de la suerte", description: "10 000 ₪", value: "amuleto"})
        }
        if (dinero>19999){
          productos.push({label: "Sicario", description: "20 000 ₪", value: "sicario"})
        }
      }
      var lista = new Discord.MessageActionRow()
  			.addComponents(
	  			new Discord.MessageSelectMenu()
		  			.setCustomId('econ_comprar')
			  		.setPlaceholder('Seleccione un producto')
				  	.setDisabled(false)
            .addOptions(productos),
  			)
      if (productos.length==0){
        lista = new Discord.MessageActionRow()
      	  .addComponents(
    			  new Discord.MessageSelectMenu()
      				.setCustomId('econ_comprar')
    	 				.setPlaceholder('No tienes suficiente dinero')
    	  			.setDisabled(true)
              .addOptions(
                [
                  {
                    label: "0",
                    value: "0"
                  }
                ]
              ),
    	    )
      }
      const boton = new Discord.MessageActionRow()
        .addComponents(
  				new Discord.MessageButton()
  					.setCustomId('econ_alimentacion_2')
  					.setLabel('<<')
            .setDisabled(false)
  					.setStyle('SECONDARY'),
          new Discord.MessageButton()
  					.setCustomId('econ_alimentacion')
  					.setLabel('<')
            .setDisabled(false)
  					.setStyle('PRIMARY'),
          new Discord.MessageButton()
  					.setCustomId('econ_ayuda')
  					.setLabel('Ayuda')
            .setDisabled(false)
  					.setStyle('SUCCESS'),
          new Discord.MessageButton()
  					.setCustomId('econ_seguridad')
  					.setLabel('>')
            .setDisabled(false)
  					.setStyle('PRIMARY'),
          new Discord.MessageButton()
  					.setCustomId('econ_otros')
  					.setLabel('>>')
            .setDisabled(false)
  					.setStyle('SECONDARY'),
  		  )
      var embed = new Discord.MessageEmbed()
        .setTitle(`LA TIENDA DE ${client.user.username.toUpperCase()} - ECONOMÍA`)
        .setThumbnail("https://lh3.googleusercontent.com/mq2nXMUjGa0PYYMqF8YSLUfWdfEfdqni3TwZLMv7TPJpxV9sXplCxbgt_B32v8l50AFjEz0IqwHVCPuGEI5BePClRk7q6PKStpU=s400")
        .addField(`Amuleto de la suerte ( 10 000 ₪ )`, "Con este valioso amuleto mágico podrás atraer la buena suerte a ti y ganarás más dinero que nunca.Se dice que tiene una maldición... ¿Pero a quién le importa? Dinero es dinero.")
        .setColor(0x5865f2)
        .setFooter("2/5")
      await interaction.update({embeds: [embed], ephemeral: true, components: [lista, boton]})
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}