const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  run: async (client, interaction) => {
    var usuario = interaction.options.getString('usuario')
    try {
      fetch("https://api.mojang.com/users/profiles/minecraft/" + usuario)
        .then(async (res) => res.json())
        .then(async (body) => {
            fetch("https://visage.surgeplay.com/full/832/" + body.id + ".png")
                .then(async (res) => res.buffer())
                .then(async (imgBuffer) => {
                    const msgAttachment = new Discord.MessageAttachment(imgBuffer);
                    var embed = new Discord.MessageEmbed()
                      .setDescription('<a:minecraft:883778180027133962> Skin de **'+usuario+'** <a:minecraft:883778180027133962>')
                      .setColor(0x5865f2)
                    await interaction.reply({embeds: [embed], files: [msgAttachment], ephemeral: false});
                })
                .catch(async (err) => {
                  var embed = new Discord.MessageEmbed()
                    .setDescription('<a:minecraft:883778180027133962> **ERROR 2**\nError con la API de Visage:\n```txt\n'+err+'\n```')
                    .setFooter('Para ver la definición concreta del error, use el comando /error')
                    .setColor(0xed4245)
                  await interaction.reply({embeds: [embed], ephemeral: true});
                });
        }).catch(async (err) => {
          var embed = new Discord.MessageEmbed()
            .setDescription('<a:minecraft:883778180027133962> **ERROR 74**\nLa base de datos de Mojang no cuenta con ningún usuario llamado "'+usuario+'"')
            .setFooter('Para ver la definición concreta del error, use el comando /error')
            .setColor(0xed4245)
          await interaction.reply({embeds: [embed], ephemeral: true});
        });
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