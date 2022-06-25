const Discord = require('discord.js')
const megadb = require('megadb')
const moment = require('moment')
const servidores = new megadb.crearDB('servidores')

module.exports = {
  run: async (client, interaction) => {
    try{
      let mensajes = 0
      if(servidores.has(`${interaction.guild.id}.mensajes.hoy.día`)){
        var fecha = await servidores.obtener(`${interaction.guild.id}.mensajes.hoy.día`)
        if(fecha === `${moment(Date.now()).format('L')}`){
          mensajes = await servidores.obtener(`${interaction.guild.id}.mensajes.hoy.numero`)
        }
      }
      var embed = new Discord.MessageEmbed()
        .addField('** **', '**DATOS DEL SERVIDOR**', false)
        .addField('Nombre:', `${interaction.guild.name}`, true)
        .addField('ID:', `${interaction.guild.id}`, true)
        .addField('** **', '** **')
        .addField('Dueñ@:', `<@!${interaction.guild.ownerId}>`, true)
        .addField('¿Tiene sistema de verificación?', `${servidores.has(`${interaction.guild.id}.verify.rol`)?`Nivel de verificación: \`${await servidores.obtener(`${interaction.guild.id}.verify.nivel`)}\``:`No`}`, true)
        .addField(`Mensajes enviados hoy:`, `${mensajes}`, true)
        .setColor(0x5865f2)
      await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
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