const Discord = require("discord.js")

module.exports = {
  run: async (client, interaction) => {
    try {

      // Establecemos mediante qué están divididas las claves en el botón
      var claves = interaction.customId.trim().split(/_+/g);
      
      // Establece los botones que serán necesarios
      const botons = new Discord.MessageActionRow()
			  .addComponents(
	  	    new Discord.MessageButton()
  		      .setCustomId('publicar_'+claves[1]+'_'+claves[2])
	  	      .setLabel('Publicar de todas formas')
		        .setStyle('SUCCESS'),
          new Discord.MessageButton()
			      .setCustomId('nopublicar_'+claves[1]+'_'+claves[2])
			      .setLabel('Mejor no la publico')
			      .setStyle('SECONDARY'),
          new Discord.MessageButton()
			      .setCustomId('borrar_'+claves[1]+'_'+claves[2])
			      .setLabel('Bórrala')
  		      .setStyle('DANGER'),
          new Discord.MessageButton()
		        .setCustomId('normas-notas_'+claves[1]+'_'+claves[2])
			      .setLabel('Normas')
				    .setStyle('PRIMARY')
            .setDisabled(true),
        );

      // Actualiza el mensaje a los botones especificados
      await interaction.update({ components: [botons] });

      // Establece un nuevo mensaje embedado
      let embed = new Discord.MessageEmbed()
        .setTitle("NORMAS DE LAS NOTAS")
        .setDescription("Si quieres publicar una nota para todo el mundo has de seguir estas normas, o de lo contrario no podrás utilizar los comandos de notas.")
        .addField("La \"constitución\"", "Normas base que ante ningún caso se pueden incumplir.\n\n- Prohibida la publicación de enlaces con contenido no permitido por los términos y condiciones de servicio de Discord (Páginas ilegales, violación de la propiedad intelectual, desnudos o semi-desnudos, pornografía, incitación a la violencia, abuso, maltrato o suicidio, etc...)\n\n- Prohibido texto gravemente ofensivo para un individuo o colectivo, incluyendo así incitaciones al odio, violencia, maltrato, abuso, etc...\n\n- Prohibido el uso de \"palabrotas\" haciendo así referencia aun individuo o colectivo, nos da igual que sea de broma, PROHIBIDO (No podemos distinguir las bromas del resto, con lo que tomamos esta medida)")
        .addField("Otras normas", "Estas siguen siendo normas que es necesario cumplir, pero su incumplimiento conllevarán sanciones más leves.\n\n- Prohibido texto Zalgo\n\n- Prohibido su uso como medio publicitario\n\n- Prohibido el spam en notas\n\n- Prohibido el uso de las notas como medio de transferencia de datos confidenciales o de carácter personal\n\n- Prohibido pasar contacto, sea telefónico o de aplicaciones externas, el único permitido es el nametag de Discord")
        .setColor(0xfee75c);

      // Responde a la interacción con el embed, y si no es capaz, intenta responder a la respuesta de la interacción.
      await interaction.reply({embeds: [embed], ephemeral: true}).catch(async()=>{
        await interaction.followUp({embeds: [embed], ephemeral: true}).catch(async()=>{
          return 
        })
      })
    } catch (e) {
      // Envía un mensaje de error
      require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}