const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios_db = new megadb.crearDB('usuarios')
const servidores = new megadb.crearDB('servidores');

module.exports = {
  run: async (client, interaction) => {
    try {
      if(!servidores.has(`${interaction.guild.id}.niveles.estado`)){
        servidores.establecer(`${interaction.guild.id}.niveles.estado`, "off")
      }
      var estado = await servidores.obtener(`${interaction.guild.id}.niveles.estado`)
      if (estado=="on"){
        let productos = []
        if(usuarios_db.has(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)){
          var dinero = await usuarios_db.obtener(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)
          if (dinero>599){
            productos.push({label: "Multiplicador por 1 día", description: "600 ₪", value: "multixp_1"})
          }
          if (dinero>999){
            productos.push({label: "Multiplicador por 2 días", description: "1 000 ₪", value: "multixp_2"})
          }
          if (dinero>4999){
            productos.push({label: "Multiplicador por 7 días", description: "5 000 ₪", value: "multixp_7"})
          }
          if (dinero>14999){
            productos.push({label: "Multiplicador por 30 días", description: "15 000 ₪", value: "multixp_30"})
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
    					.setCustomId('econ_seguridad')
  	  				.setLabel('<')
              .setDisabled(false)
  			  		.setStyle('PRIMARY'),
            new Discord.MessageButton()
  					  .setCustomId('econ_ayuda')
    					.setLabel('Ayuda')
              .setDisabled(false)
  		  			.setStyle('SUCCESS'),
            new Discord.MessageButton()
  				  	.setCustomId('econ_otros')
  					  .setLabel('>')
              .setDisabled(false)
    					.setStyle('PRIMARY'),
            new Discord.MessageButton()
    					.setCustomId('econ_otros_2')
    					.setLabel('>>')
              .setDisabled(false)
    					.setStyle('SECONDARY'),
    		  )
        var embed = new Discord.MessageEmbed()
          .setTitle(`LA TIENDA DE ${client.user.username.toUpperCase()} - XP`)
          .addField("Multiplicador de XP ( 600 - 15 000 ₪ )", "Con este multiplicador logra incrementar al doble la cantidad de **`xp`** que consigues por mensaje.")
          .setColor(0x5865f2)
          .setFooter("4/5")
        await interaction.update({embeds: [embed], ephemeral: true, components: [lista, boton]})
      } else {
        var lista = new Discord.MessageActionRow()
          .addComponents(
            new Discord.MessageSelectMenu()
              .setCustomId('econ_comprar')
              .setPlaceholder('Pasillo cerrado')
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
        const boton = new Discord.MessageActionRow()
          .addComponents(
  		  		new Discord.MessageButton()
  			  		.setCustomId('econ_alimentacion')
  				  	.setLabel('<<')
              .setDisabled(false)
  					  .setStyle('SECONDARY'),
            new Discord.MessageButton()
    					.setCustomId('econ_seguridad')
  	  				.setLabel('<')
              .setDisabled(false)
  			  		.setStyle('PRIMARY'),
            new Discord.MessageButton()
  					  .setCustomId('econ_ayuda')
    					.setLabel('Ayuda')
              .setDisabled(false)
  		  			.setStyle('SUCCESS'),
            new Discord.MessageButton()
  				  	.setCustomId('econ_otros')
  					  .setLabel('>')
              .setDisabled(false)
    					.setStyle('PRIMARY'),
            new Discord.MessageButton()
    					.setCustomId('econ_otros_2')
    					.setLabel('>>')
              .setDisabled(false)
    					.setStyle('SECONDARY'),
    		  )
        var embed = new Discord.MessageEmbed()
          .setTitle(`LA TIENDA DE ${client.user.username.toUpperCase()} - XP`)
          .setDescription(`Tu servidor tiene el sistema de niveles desactivado.`)
          .setColor(0x5865f2)
          .setFooter("4/5")
        await interaction.update({embeds: [embed], ephemeral: true, components: [lista, boton]})
      }
    }catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}