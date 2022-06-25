const Discord = require('discord.js')
const megadb = require("megadb")
const notes = new megadb.crearDB('notas')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    try {
      const code_primitivo = interaction.options.getString('código');
      var code = code_primitivo.toUpperCase()
      if(!notes.has(code)){
        var embed = new Discord.MessageEmbed()
          .setDescription("No se ha encontrado la nota `"+code+"`")
          .setColor(0xed4245)
        await interaction.reply({embeds: [embed], ephemeral: true})
      } else {
        var perm = interaction.member.permissions.has("ADMINISTRATOR")
        var seguridad = await notes.obtener(`${code}.ajustes.seguridad`)
        var servidor = await notes.obtener(`${code}.ajustes.servidor`)
        var autor = await notes.obtener(`${code}.ajustes.autor`)
        if(interaction.member.id==autor){
          var embed = new Discord.MessageEmbed()
            .setDescription("Se ha eliminado la nota exitosamente")
            .setColor(0x5865f2)
          try {
            notes.eliminar(code)
            usuarios.restar(`${autor}.notas.cantidad`, 1)
            usuarios.extract(`${autor}.notas.propiedad`, code)
            await interaction.reply({embeds: [embed], ephemeral: true})
          } catch {
            var embed = new Discord.MessageEmbed()
              .setDescription("Ha ocurrido un error intentando borrar la nota")
              .setColor(0xed4245)
            await interaction.reply({embeds: [embed], ephemeral: true})
          }
        } else if (seguridad=="oculta" && interaction.guild.id==servidor && perm ){
          var embed = new Discord.MessageEmbed()
            .setDescription("Se ha eliminado la nota exitosamente")
            .setColor(0x5865f2)
          try {
            notes.eliminar(code)
            usuarios.restar(`${autor}.notas.cantidad`, 1)
            usuarios.extract(`${autor}.notas.propiedad`, code)
            await interaction.reply({embeds: [embed], ephemeral: true})
          } catch {
            var embed = new Discord.MessageEmbed()
              .setDescription("Ha ocurrido un error intentando borrar la nota")
              .setColor(0xed4245)
            await interaction.reply({embeds: [embed], ephemeral: true})
          }
        } else {
          var embed = new Discord.MessageEmbed()
            .setDescription("¡No tienes permiso para eliminar esta nota!")
            .setColor(0xed4245)
          await interaction.reply({embeds: [embed], ephemeral: true})
        }
      }
    } catch {
      async (e) => {
        /* No caso de que falle, indicar erro e envialo á canle de erros */
        var embed = new Discord.MessageEmbed() // Crea o embed co erro
          .setDescription(`**ERROR 1**\nSe le ha enviado el error a mis desarrolladores para que lo solucionen.`)
          .setFooter('Para ver la definición concreta del error, use el comando /error')
          .setColor(0x5865f2)
        await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return}) // Envíalle o embed ao usuario que sufriu o erro
        var embed = new Discord.MessageEmbed() // Crea un novo embed co erro pero extendido
          .setTitle(`ERROR AUTO-REPORTADO`)
          .setFooter(`Usuario:`, `<@!${interaction.member.id}>\n${interaction.user.username}#${interaction.user.discriminator}\n${interaction.member.id}`, true)
          .addField('Servidor:', `${interaction.guild.name}\n${interaction.guild.id}`, true)
          .addField(`Error reportado:`, `\`/${interaction.commandName} ${interaction.options.getSubcommand()}\`\n\`\`\`\n${e}\n\`\`\``) // Consta o erro aquí
          .setColor(0x5865f2)
        client.channels.resolve(`851207782464094299`).send({content: `<@!643575943289634836>`, embeds: [embed]}).catch(()=>{return}) // Envía o embed na canle de erros mencionando a gacarbla
      }
    }
  }
}