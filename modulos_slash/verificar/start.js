const Discord = require('discord.js')
const megadb = require('megadb')
const servidores = new megadb.crearDB('servidores')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    if(servidores.has(`${interaction.guild.id}.verify.rol`)){
      try {

        // Obtiene la ID del rol de verificación
        var rol = await servidores.obtener(`${interaction.guild.id}.verify.rol`)

        // Obtiene de la base de datos el nivel de seguridad del sistema de verificación
        var nivel = await servidores.obtener(`${interaction.guild.id}.verify.nivel`)

        // En el caso de que el usuario resulte estar en la blacklist
        if (servidores.has(`${interaction.guild.id}.whitelist.${interaction.member.id}`) && interaction.member.bannable) {try{interaction.member.ban()}catch{return}}

        // Si el usuario no tiene ya el rol de verificado
        else if(!interaction.member.roles.cache.has(rol)){
          
          // En el caso en el que la seguridad del servidor sea "nula" o el usuario esté en la whitelist
          if(nivel==='NULA' || servidores.has(`${interaction.guild.id}.whitelist.${interaction.member.id}`)){
            
            // Cre un nuevo embed
            var embed = new Discord.MessageEmbed()
              .setDescription(`**Has sido verificad@ exitosamente**`)
              .setColor(0x5865f2)

            // Responde al comando con el embed
            await interaction.reply({embeds: [embed], ephemeral: true})

            // Intenta asignar el rol que corresponde a verificad@, pero si no puede devuelve un error
            interaction.member.roles.add(rol).catch(async(error)=>{

              // Establece un nuevo embed
              var embed = new Discord.MessageEmbed()
                .setDescription(`**ERROR**\nEl bot no ha sido capaz a otorgarte el rol <@&${rol}>.\nPor favor, contacta con alguien del staff para solucionar este error.\n\nEl bot ha declarado:\n\`\`\`\n${error}\n\`\`\``)
                .setColor(0xed4245)

              // Responde a la respuesta con el embed especificado
              interaction.followUp({content: `<@!${interaction.member.id}>`,embeds: [embed], ephemeral: true}).catch(()=>{return}) // Envía o embed
            });
          } else {

            // Establece caracteres predeterminados
            let crt = "13456789"

            // Establece número de caracteres predeterminado
            let crt_n = "4"

            // Establece los caracteres y su número en función del nivel de seguridad del servidor
            if(nivel=="BAJA") {
              crt="1234567890"; crt_n = "4"
            } else if (nivel=="MEDIA") {
              crt="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890";crt_n = "6"
            } else if (nivel==='ALTA') {
              crt="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890";crt_n = "8"
            } else if (nivel === 'EXTREMA') {
              crt="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890@#%_¿?!¡=_/)([]{}";crt_n = "8"
            } else {
              crt="ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz1234567890@#%_¿?!¡=_/)([]{}";crt_n="12"
            }

            // Indica que "contraseña" es un array
            let contraseña = []

            // Establece i como variable de valor 0
            var i = 0

            // Creamos un for que establezca en el array "contraseña" los caracteres en consecuencia a los especificados que
            // tiene permitido para la seguridad de dicho servidor
            for (i=0; i<Number.parseInt(crt_n); i++){
              contraseña[i] = crt.charAt(Math.floor(Math.random() * crt.length));
            }

            // Establece la contraseña como el array comvertido en una unidad de texto completa sin separación
            contraseña = contraseña.join("")

            // Inicia el proceso "embeds"
            require('./embeds').run(client, interaction, contraseña)
          }
        } else {
          
          // Establece un nuevo embed
          var embed = new Discord.MessageEmbed()
            .setDescription(`¡Ya estás verificad@!`)
            .setColor(0xed4245)

          // Intenta enviar el embed y si no es capaz envía error 05
          await interaction.reply({embeds: [embed], ephemeral: true}).catch((e)=>{
            require("../../modulos_error/start").interact(client, interaction, "05", "no",  e, "reply");
          })

          // Comprobamos si el usuario ya está verificado pero nose ha borrado de la base de datos
          if(usuarios.has(`${interaction.member.id}.verify.${interaction.guild.id}`)){

            // Intenta borrar de una vez por todas los datos, y si no es capaz lo ignora
            try { usuarios.eliminar(`${interaction.member.id}.verify.${interaction.guild.id}`) } catch (e) {return} // Se se topa bórrao
          }
        }
      } catch (e) {
      
        // Enviar mensaje de error
        require("../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply");
      
      };
    } else {
      /* No caso de que o servidor non teña sistema de seguridade */
      var embed = new Discord.MessageEmbed() // Crea un embed
        .setDescription(`Este servidor no tiene sistema de verificación.\nEste comando está deshabilitado.`)
        .setColor(0xed4245)
      await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return}) // Envía o embed
    }
  }
}