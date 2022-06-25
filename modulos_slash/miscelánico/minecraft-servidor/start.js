const Discord = require('discord.js')
const request = require('request')

module.exports = {
  run: async (client, interaction) => {
    var ip = interaction.options.getString('ip')
    let pingURL = `https://api.minetools.eu/ping/${ip}`
    try {
      var embed = new Discord.MessageEmbed()
        .setDescription('<a:discord_cargando:883000049674641438> **BUSCANDO**')
        .setColor(0x5865f2)
      await interaction.reply({embeds: [embed], ephemeral: true})
      request(pingURL, async function(err, resp, body){
      body = JSON.parse(body);
        if(body.error) {
          var embed = new Discord.MessageEmbed()
            .setDescription('**ERROR**\nNo se ha encontrado el servidor')
            .setColor(0xed4245)
          await interaction.followUp({embeds: [embed], ephemeral: true})
        } else {
          let motd = `http://status.mclive.eu/MinecraftServer/${ip}/25565/banner.png`
          var embed = new Discord.MessageEmbed()
            .setDescription('<a:minecraft:883778180027133962> **ESTADO DEL SERVIDOR** <a:minecraft:883778180027133962>')
            .addField('<a:wumpus_baile:884195048525295668> IP servidor', `${ip}`)
            .addField('<a:michi_pc:883000048269537410> Latencia', `${body.latency} ms`)
            .setImage(motd)
            .setColor(0x5865f2)
          await interaction.followUp({embeds: [embed]})
        }
      })
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