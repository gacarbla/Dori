const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios_db = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    try {
      let productos = []
      if(usuarios_db.has(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)){
        var dinero = await usuarios_db.obtener(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)
        if (dinero>499){
          productos.push({label: "Material escolar", description: "500 ₪", value: "material_escolar"})
        }
        if (dinero>999){
          productos.push({label: "Soborno", description: "1 000 ₪", value: "soborno"})
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
				  	.setCustomId('econ_xp')
			  		.setLabel('<')
            .setDisabled(false)
		  			.setStyle('PRIMARY'),
          new Discord.MessageButton()
	  				.setCustomId('econ_ayuda')
  					.setLabel('Ayuda')
            .setDisabled(false)
		  			.setStyle('SUCCESS'),
          new Discord.MessageButton()
				  	.setCustomId('econ_404_1')
					  .setLabel('>')
            .setDisabled(true)
					  .setStyle('PRIMARY'),
          new Discord.MessageButton()
			  		.setCustomId('econ_404_2')
		  			.setLabel('>>')
            .setDisabled(true)
	  				.setStyle('SECONDARY'),
  		  )
      var embed = new Discord.MessageEmbed()
        .setTitle(`LA TIENDA DE ${client.user.username.toUpperCase()} - OTROS`)
        .addField("Material escolar ( 500 ₪ )", "¿Quieres estudiar para poder trabajar en un mejor puesto?\nCompra el material escolar necesario y logra tus objetivos.")
        .setFooter(`5/5`)
        .setColor(0x5865f2)
      await interaction.update({embeds: [embed], ephemeral: true, components: [lista, boton]})
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  } 
}