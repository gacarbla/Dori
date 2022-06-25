const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios_db = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    try {
      let productos = []
      if(usuarios_db.has(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)){
        var dinero = await usuarios_db.obtener(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)
        if (dinero>1999){
          productos.push({label: "Guardaespaldas por 1 día", description: "2 000 ₪", value: "guardaespaldas_1"})
        }
        if (dinero>3499){
          productos.push({label: "Guardaespaldas por 2 días", description: "3 500 ₪", value: "guardaespaldas_2"})
        }
        if (dinero>9999){
          productos.push({label: "Guardaespaldas por 7 días", description: "10 000 ₪", value: "guardaespaldas_7"})
        }
        if (dinero>29999){
          productos.push({label: "Guardaespaldas por 30 días", description: "30 000 ₪", value: "guardaespaldas_30"})
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
			  		.setCustomId('econ_alimentacion')
				  	.setLabel('<<')
            .setDisabled(false)
					  .setStyle('SECONDARY'),
          new Discord.MessageButton()
  					.setCustomId('econ_economia')
	  				.setLabel('<')
            .setDisabled(false)
			  		.setStyle('PRIMARY'),
          new Discord.MessageButton()
					  .setCustomId('econ_ayuda')
  					.setLabel('Ayuda')
            .setDisabled(false)
		  			.setStyle('SUCCESS'),
          new Discord.MessageButton()
				  	.setCustomId('econ_xp')
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
        .setTitle(`LA TIENDA DE ${client.user.username.toUpperCase()} - SEGURIDAD`)
        .setThumbnail("https://i.ibb.co/khjXRys/escudo-D.png")
        .addField("Guardaespaldas ( 2 000 ₪ - 30 000 ₪)", "Contrata un guardaespaldas por 1, 2, 7 o 30 días para que nadie pueda robarte.\nEl servicio es 100% secreto, y nadie se enterará de que lo has contratado.")
        .setColor(0x5865f2)
        .setFooter("3/5")
      await interaction.update({embeds: [embed], ephemeral: true, components: [lista, boton]})
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}