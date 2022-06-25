const Discord = require("discord.js")
const megadb = require("megadb")
const servidores = new megadb.crearDB('servidores')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    try{
      if (servidores.has(`${interaction.guild.id}.canales.confesion`)){
        const text = interaction.options.getString('texto');
        const gender = interaction.options.getString('género');
        const age = interaction.options.getInteger('edad');
        try {
          if (!age || ( 12<age && age<61 )) {
            var embed = new Discord.MessageEmbed()
              .setAuthor("Mi secreto")
              .setTitle(`Confesión de ${gender}${age?` de ${age} años`:""}`)
              .setDescription(`${text}`)
              .setFooter("Fecha de la confesión:")
              .setTimestamp()
              .setColor("RANDOM")
            client.channels.resolve(await servidores.obtener(`${interaction.guild.id}.canales.confesion`)).send({embeds: [embed]}).then(m=>{
              m.react("😂")
              m.react("😳")
              m.react("😭")
              m.react("🥵")
              m.react("😱")
              m.react("👍🏼")
              m.react("👎🏼")
            })
            var embed = new Discord.MessageEmbed()
              .setDescription("Tu confesión se ha publicado exitosamente.\nComo Dori no guarda registro de los autores y autoras de las confesiones no podrás eliminar tu confesión.")
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true})
          } else if(age<13){
            var embed = new Discord.MessageEmbed()
              .setDescription("Menores de 13 años no pueden usar discord, con lo que no permitimos la publicación de confesiones a menores de 13 años.")
              .setColor(0xed4245)
            await interaction.reply({embeds: [embed], ephemeral: true})
          } else if (age>60){
            var embed = new Discord.MessageEmbed()
              .setDescription("¿De verdad esperas que me crea que tienes esa edad?\nSi vas a poner una falsa no pongas edad y ya")
              .setColor(0xed4245)
            await interaction.reply({embeds: [embed], ephemeral: true})
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
      } else {
        var embed = new Discord.MessageEmbed()
          .setDescription("¡Este servidor carece de canal de confesiones!")
          .setColor(0xed4245)
        await interaction.reply({embeds: [embed], ephemeral: true})
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