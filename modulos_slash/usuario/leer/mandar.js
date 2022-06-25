const Discord = require('discord.js')
const megadb = require("megadb")
const notes = new megadb.crearDB('notas')

module.exports = {
  run: async (client, interaction, code, vsb) => {
    try {
      var título = await notes.obtener(`${code}.mensaje.título`)
      var texto = await notes.obtener(`${code}.mensaje.texto`)
      var fecha = await notes.obtener(`${code}.mensaje.fecha`)
      var embed = new Discord.MessageEmbed()
        .setTitle(título)
        .setDescription(texto)
        .setFooter("Nota "+code)
        .setTimestamp(fecha)
        .setColor(0x5865f2)
      if(vsb){
        var seguridad = await notes.obtener(`${code}.ajustes.contraseña`)
        if(seguridad==""||!seguridad){
          try {
            await interaction.reply({embeds: [embed], ephemeral: false})
          } catch { 
            async () => {
              var embed = new Discord.MessageEmbed() // Crea o embed co erro
                .setDescription(`**ERROR 1**\nSe ha producido un error al intentar enviar el mensaje`)
                .setFooter('Para ver la definición concreta del error, use el comando /error')
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return}) // Envíalle o embed ao usuario que sufriu o erro
            }
          }
        } else {
          var embed2 = new Discord.MessageEmbed()
            .setDescription("Las notas con contraseña no se pueden mostrar en público")
            .setColor(0xed4245)
          try {
            await interaction.reply({embeds: [embed], ephemeral: true})
            await interaction.followUp({embeds: [embed2], ephemeral: true})
          } catch { 
            async () => {
              var embed = new Discord.MessageEmbed() // Crea o embed co erro
                .setDescription(`**ERROR 1**\nSe ha producido un error al intentar enviar el mensaje`)
                .setFooter('Para ver la definición concreta del error, use el comando /error')
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return}) // Envíalle o embed ao usuario que sufriu o erro
            }
          }
        }
      } else {
        try {
          await interaction.reply({embeds: [embed], ephemeral: true})
        } catch { 
          async () => {
            var embed = new Discord.MessageEmbed() // Crea o embed co erro
              .setDescription(`**ERROR 1**\nSe ha producido un error al intentar enviar el mensaje`)
              .setFooter('Para ver la definición concreta del error, use el comando /error')
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return}) // Envíalle o embed ao usuario que sufriu o erro
          }
        }
      }
    } catch {
      async (e) => {
        var embed = new Discord.MessageEmbed() // Crea o embed co erro
              .setDescription(`**ERROR 1**\nSe ha producido un error al intentar enviar el mensaje`)
              .setFooter('Para ver la definición concreta del error, use el comando /error')
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return}) // Envíalle o embed ao usuario que sufriu o erro
      }
    }
  }
}