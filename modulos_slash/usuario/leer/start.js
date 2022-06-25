const Discord = require('discord.js')
const megadb = require("megadb")
const notes = new megadb.crearDB('notas')

module.exports = {
  run: async (client, interaction) => {
    try {
      var embed_e = new Discord.MessageEmbed()
        .setDescription(`**ERROR 1**\nSe ha producido un error al intentar enviar el mensaje`)
        .setFooter('Para ver la definición concreta del error, use el comando /error')
        .setColor(0x5865f2)
      const code_primitivo = interaction.options.getString('código');
      const code = code_primitivo.toUpperCase()
      let vsb = interaction.options.getString('visibilidad');
      if(vsb=="pub"){
        vsb = true
      } else if (vsb=="priv"){
        vsb=false
      }
      if(notes.has(code)) {
        var seguridad = await notes.obtener(`${code}.ajustes.contraseña`)
        var sgd = await notes.obtener(`${code}.ajustes.seguridad`)
        if (sgd=="") {
          try {
            notes.eliminar(code)
            var embed = new Discord.MessageEmbed()
              .setDescription("**Nota corrupta**\nEsta nota no presenta un patrón \"sano\", he decidido borrarla para evitar problemas de seguridad")
              .setColor(0x5865f2)
          } catch { 
            async (e) => {
              await interaction.reply({embeds: [embed_e], ephemeral: true}).catch(()=>{return})
            }
          }
        } else if (sgd=="pública"){
          try {
            require("./mandar").run(client, interaction, code, vsb)
          } catch { 
            async (e) => {
              await interaction.reply({embeds: [embed_e], ephemeral: true}).catch(()=>{return})
            }
          }
        } else if (sgd=="oculta"){
          var filtro = await notes.obtener(`${code}.ajustes.servidor`)
          if(interaction.guild.id==filtro){
            try {
              require("./mandar").run(client, interaction, code, vsb)
            } catch { 
              async (e) => {
                await interaction.reply({embeds: [embed_e], ephemeral: true}).catch(()=>{return})
              }
            }
          } else {
            var embed = new Discord.MessageEmbed()
              .setDescription("Esta nota está oculta y sólo se puede abrir desde el servidor en el que fué escrita.")
              .setColor(0xed4245)
            try {
              await interaction.reply({embeds:[embed], ephemeral: true}).catch(async()=>{
                await interaction.reply({embeds: [embed_e], ephemeral: true}).catch(()=>{return})
              })
            } catch { 
              async (e) => {
                await interaction.reply({embeds: [embed_e], ephemeral: true}).catch(()=>{return})
              }
            }
          }
        } else if (sgd=="privada"){
          var filtro = await notes.obtener(`${code}.ajustes.autor`)
          if(interaction.member.id==filtro){
            try {
              require("./mandar").run(client, interaction, code, vsb)
            } catch { 
              async (e) => {
                await interaction.reply({embeds: [embed_e], ephemeral: true}).catch(()=>{return})
              }
            }
          } else {
            var embed = new Discord.MessageEmbed()
              .setDescription("Esta nota es privada y sólo la puede abrir su creador/a.")
              .setColor(0xed4245)
            try{
              await interaction.reply({embeds:[embed], ephemeral: true}).catch(async()=>{
                await interaction.reply({embeds: [embed_e], ephemeral: true}).catch(()=>{return})
              })
            } catch { 
              async (e) => {
                await interaction.reply({embeds: [embed_e], ephemeral: true}).catch(()=>{return})
              }
            }
          }
        }
      } else {
        var embed = new Discord.MessageEmbed()
          .setDescription("No se ha encontrado la nota que buscas")
          .setColor(0xed4245)
        try {
          await interaction.reply({embeds: [embed], ephemeral: true}).catch(async()=>{
            await interaction.reply({embeds: [embed_e], ephemeral: true}).catch(()=>{return})
          })
        } catch { 
          async (e) => {
            await interaction.reply({embeds: [embed_e], ephemeral: true}).catch(()=>{return})
          }
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