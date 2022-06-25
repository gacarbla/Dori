const Discord = require('discord.js')
const megadb = require('megadb')
const servidores = new megadb.crearDB('servidores')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction, contraseña) => {

    // Establece el botón de ayuda
    const componente = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setCustomId('ayudaverify')
					.setLabel('Ayuda')
					.setStyle('SUCCESS'),
			);

    try {

      // Volvemos a obtener la ID del rol de verificado
      var rol = await servidores.obtener(`${interaction.guild.id}.verify.rol`)

      // Si el usuario no consta como que haya intentado acceder anteriormente al servidor
      if(!usuarios.has(`${interaction.member.id}.verify.${interaction.guild.id}.clave`)) {
        
        // Establecemos el temporizador como dentro de 180 segundos
        var temporidor = Math.floor(Date.now()+180000)

        // Establece un nuevo embed
        var embed = new Discord.MessageEmbed()
            .addField(`Clave de acceso a **${interaction.guild.name}**`, `\`${contraseña}\``)
            .setFooter('Esta clave dejará de funcionar en 180 segundos')
            .setColor(0x5865f2)
        // Intenta enviar el mensaje (si falla envía error 05) y establecer los datos en la base de datos (Si falla envía error 36)
        try {
          await interaction.reply({embeds: [embed], components: [componente],ephemeral: true}).catch((e)=>{
            require("../../modulos_error/start").interact(client, interaction, "05", "no",  e, "reply");
          })
          usuarios.establecer(`${interaction.member.id}.verify.${interaction.guild.id}`, {intentos: 0, clave: `${contraseña}`, temporizador: temporidor}) // Rexistro do uso desta
        } catch (e) {
          require("../../modulos_error/start").interact(client, interaction, "36", "no",  e, "reply");
        };
      
      // Si consta como que el usuario ya ha intentado acceder anteriormente al servidor
      } else {
        try {

          // Obtiene la fecha en la que ya no se podrá verificar el usuario
          var tiempo = await usuarios.obtener(`${interaction.member.id}.verify.${interaction.guild.id}.temporizador`)

          // Obtiene los intentos que le quedan al usuario
          var intentos = await usuarios.obtener(`${interaction.member.id}.verify.${interaction.guild.id}.intentos`)

          // Si el tiempo límite de verificación ya ha pasado
          if(tiempo<Date.now()){

            // Establece un nuevo temporizador de 180 segundos
            var temporidor = Math.floor(Date.now()+180000)

            // Crea un nuevo embed
            var embed = new Discord.MessageEmbed()
              .setTitle('TIEMPO AGOTADO')
              .setDescription('Has tardado más de 3 minutos en introducir la clave y se ha generado una nueva')
              .addField(`Clave de acceso a **${interaction.guild.name}**`, `\`${contraseña}\``) // Indica o novo contrasinal
              .setFooter('Esta clave dejará de funcionar en 180 segundos')
              .setColor(0x5865f2)

            // Intenta enviar el embed (Si no puede envía error 05) y establecer los nuevos datos en la base de datos (Si no puede envía error 36)
            try {
              await interaction.reply({embeds: [embed], components: [componente], ephemeral: true}).catch((e)=>{
                require("../../modulos_error/start").interact(client, interaction, "05", "no",  e, "reply");
              })
              usuarios.establecer(`${interaction.member.id}.verify.${interaction.guild.id}`, {intentos: 0, clave: `${contraseña}`, temporizador: temporidor}) // Establece de novo os intentos e a clave
            } catch (e) {
              require("../../modulos_error/start").interact(client, interaction, "36", "no",  e, "reply");
            };

          // Si ya ha intentado verificarse 3 veces
          } else if (intentos>2){

            // Crea un embed
            var embed = new Discord.MessageEmbed()
              .setDescription(`Se han acabado tus intentos por lo que deberás esperar hasta que se acabe el tiempo para volver a intentarlo.`)
              .setFooter(`${Math.floor((tiempo-Date.now())/1000)} segundos restantes || ${Math.floor(3-intentos)} intentos restantes`) // Indica o tempo restante para que poida volver empregar o comando
              .setColor(0xed4245)

            // Intenta enviar el embed Y si no puede envía error 05
            await interaction.reply({embeds: [embed], ephemeral: true}).catch((e)=>{
              require("../../modulos_error/start").interact(client, interaction, "05", "no",  e, "reply");
            })
          
          // Si se cumplen todas las condiciones (Menos de 3 intentso y en menos de 180 segundos)
          } else {

            // Obtiene la clave de acceso al servidor especificada por el usuario
            const clave = interaction.options.getString('clave')

            // Obtiene el tiempo límite del usuario
            var tiempo = await usuarios.obtener(`${interaction.member.id}.verify.${interaction.guild.id}.temporizador`)

            // Obtiene el número de veces que ha intentado acceder
            var intentos = await usuarios.obtener(`${interaction.member.id}.verify.${interaction.guild.id}.intentos`)

            // Si no ha especificado la clave
            if(!clave){
              
              // Crea un nuevo embed
              var embed = new Discord.MessageEmbed()
                .setDescription(`Es necesario especificar una clave.`)
                .setFooter(`${Math.floor((tiempo-Date.now())/1000)} segundos restantes || ${Math.floor(3-intentos)} intentos restantes`)
                .setColor(0xed4245)
              
              // Envía el embed y si no puede envía el error 05
              await interaction.reply({embeds: [embed], components: [componente], ephemeral: true}).catch((e)=>{
                require("../../modulos_error/start").interact(client, interaction, "05", "no",  e, "reply");
              })
            
            // Si ha especificado una clave
            } else {

              // Obtiene la contraseña real
              var contrasinal = await usuarios.obtener(`${interaction.member.id}.verify.${interaction.guild.id}.clave`)

              // Si son iguales
              if(clave===contrasinal){
                
                // Crea un embed
                var embed = new Discord.MessageEmbed()
                  .setDescription(`Clave correcta`)
                  .setColor(0x5865f2)
                
                try {
                  
                  // Responde al mensaje con el embed
                  await interaction.reply({embeds: [embed], ephemeral: true})

                  // Borra los datos de la base de datos
                  usuarios.eliminar(`${interaction.member.id}.verify.${interaction.guild.id}`)

                  // Añade el rol al usuario
                  interaction.member.roles.add(rol).catch(async(error)=>{

                    // Crea un nuevo embed
                    var embed = new Discord.MessageEmbed()
                      .setDescription(`**ERROR 42**\nLa clave era correcta, pero el bot no ha sido capaz a otorgarte el rol <@&${rol}>.\nPor favor, contacta con alguien del staff para solucionar este error.\n\nEl bot ha declarado:\n\`\`\`\n${error}\n\`\`\``)
                      .setColor(0xed4245)

                    // Encía el embed como respuesta a la respuesta
                    interaction.followUp({content: `<@!${interaction.member.id}>`,embeds: [embed], ephemeral: true}).ctach((e)=>{
                      // Envía error 05
                      require("../../modulos_error/start").interact(client, interaction, "05", "no",  e, "reply");
                    })
                  });
                } catch (e) {
      
                  // Enviar mensaje de error
                  require("../../modulos_error/start").interact(client, interaction, "01", "no",  e, "reply", "Se ha detectado un error no esperado.\nPor favor vuelva a intentarlo y si el error persiste contacte con el desarrollador mediante el comando \`/error reportar\`");
                
                };

            // Si se equivoca con la contraseña
            } else {
              
              // Suma al número de veces intentado "1"
              usuarios.sumar(`${interaction.member.id}.verify.${interaction.guild.id}.intentos`, 1)

              // Establece un nuevo  embed
              var embed = new Discord.MessageEmbed()
                .setDescription(`**ERROR 18**\nLa clave es incorrecta.`)
                .setFooter(`${Math.floor((tiempo-Date.now())/1000)} segundos restantes || ${Math.floor(3-(intentos+1))} intentos restantes`) // Indica tempo e intentos restantes
                .setColor(0xed4245)

              // Intenta enviar el embed, y si no puede envía error 05
              await interaction.reply({embeds: [embed], components: [componente], ephemeral: true}).catch((e)=>{
                require("../../modulos_error/start").interact(client, interaction, "05", "no",  e, "reply");
              }) 
            }
          }
        }
      } catch (e) {
      
        // Enviar mensaje de error
        require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
      
      };
      }
    } catch (e) {
      
      // Enviar mensaje de error
      require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
    
    };
  }
}