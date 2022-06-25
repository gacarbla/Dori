const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    try {
      let perm = interaction.member.permissions.has('ADMINISTRATOR')||interaction.member.id==='643575943289634836'
      if(!perm){
        require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
      } else {
        const cantidad = interaction.options.getInteger('cantidad');
        const act = interaction.options.getString('acción');
        const lugar = interaction.options.getString('lugar');
        const usuario = interaction.options.getUser('usuario');
        if(!usuarios.has(`${usuario.id}.dinero.${interaction.guild.id}`)){
          var embed = new Discord.MessageEmbed()
            .setDescription('**ERROR 74**\nEsta persona no está registrada.\nPara registrarse sólo tiene que enviar un mensaje en este servidor.')
            .setFooter('Para ver la definición concreta del error, use el comando /error')
            .setColor(0xed4245)
          await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
        } else {
          if(act=="sumar"){
            if(cantidad<0){
              var embed = new Discord.MessageEmbed()
                .setDescription(`No se puede sumar una cantidad negativa de dinero.\nPara restar dinero puede emplear "restar".`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            } else if (cantidad==0) {
              var embed = new Discord.MessageEmbed()
                .setDescription(`No se puede sumar \`0 ₪\`.`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            } else {
              usuarios.sumar(`${usuario.id}.dinero.${interaction.guild.id}.${lugar}`, cantidad)
              var embed = new Discord.MessageEmbed()
                .setDescription(`Has sumado \`${cantidad} $\` ${lugar==='cartera'?"a la":"al"} ${lugar} de <@!${usuario.id}>`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            }
          } else if (act=="establecer") {
            usuarios.establecer(`${usuario.id}.dinero.${interaction.guild.id}.${lugar}`, cantidad)
            var embed = new Discord.MessageEmbed()
              .setDescription(`Has establecido el dinero de  <@!${usuario.id}> a \`${cantidad} $\` en ${lugar==='cartera'?"la":"el"} ${lugar}`)
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
          } else if (act=="restar") {
            if(cantidad<0){
              var embed = new Discord.MessageEmbed()
                .setDescription(`No se puede restar una cantidad negativa de dinero.\nPara sumar dinero puede emplear "sumar".`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            } else if (cantidad==0) {
              var embed = new Discord.MessageEmbed()
                .setDescription(`No se puede restar \`0$\`.`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            } else {
              usuarios.restar(`${usuario.id}.dinero.${interaction.guild.id}.${lugar}`, cantidad)
              var embed = new Discord.MessageEmbed()
                .setDescription(`Has restado \`${cantidad} $\` ${lugar==='cartera'?"a la":"al"} ${lugar} de <@!${usuario.id}>`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            }
          } else if (act=="multiplicar") {
            var cuanty = await usuarios.obtener(`${usuario.id}.dinero.${interaction.guild.id}.${lugar}`)
            var x = Math.floor(cuanty*cantidad)
            usuarios.establecer(`${usuario.id}.dinero.${interaction.guild.id}.${lugar}`, x)
            var embed = new Discord.MessageEmbed()
              .setDescription(`Has multiplicado por \`${cantidad}\` el dinero de <@!${usuario.id}> en su ${lugar}.\nAhora tiene \`${x} $\``)
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
          } else if (act=="dividir") {
            var cuanty = await usuarios.obtener(`${usuario.id}.dinero.${interaction.guild.id}.${lugar}`)
            var x = Math.floor(cuanty/cantidad)
            usuarios.establecer(`${usuario.id}.dinero.${interaction.guild.id}.${lugar}`, x)
            var embed = new Discord.MessageEmbed()
              .setDescription(`Has dividido entre \`${cantidad}\` el dinero de <@!${usuario.id}> en su ${lugar}.\nTras el redondeo, se ha quedado con \`${x} $\``)
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
          } else {
            require("../../../modulos_error/start").interact(client, interaction, "01", "si", "Error en la programación", "reply") 
          }
        }
      }
    } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply") }
  }
}