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
        const usuario = interaction.options.getUser('usuario');
        if(!usuarios.has(`${usuario.id}.xp.${interaction.guild.id}.puntos`)){
          var embed = new Discord.MessageEmbed()
            .setDescription('**ERROR 74**\nEsta persona no está registrada.\nPara registrarse sólo tiene que enviar un mensaje en este servidor.')
            .setFooter('Para ver la definición concreta del error, use el comando /error')
            .setColor(0xed4245)
          await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
        } else {
          if(act=="sumar"){
            if(cantidad<0){
              var embed = new Discord.MessageEmbed()
                .setDescription(`No se puede sumar una cantidad negativa de XP.\nPara restar XP puede emplear "restar".`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            } else if (cantidad==0) {
              var embed = new Discord.MessageEmbed()
                .setDescription(`No se puede sumar \`0 XP\`.`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            } else {
              usuarios.sumar(`${usuario.id}.xp.${interaction.guild.id}.puntos`, cantidad)
              var embed = new Discord.MessageEmbed()
                .setDescription(`Has sumado \`${cantidad} XP\` a <@!${usuario.id}>`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            }
          } else if (act=="establecer") {
            usuarios.establecer(`${usuario.id}.xp.${interaction.guild.id}.puntos`, cantidad)
            var embed = new Discord.MessageEmbed()
              .setDescription(`Has establecido el XP de  <@!${usuario.id}> a \`${cantidad} XP\``)
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
          } else if (act=="restar") {
            if(cantidad<0){
              var embed = new Discord.MessageEmbed()
                .setDescription(`No se puede restar una cantidad negativa de XP.\nPara sumar XP puede emplear "sumar".`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            } else if (cantidad==0) {
              var embed = new Discord.MessageEmbed()
                .setDescription(`No se puede restar \`0 XP\`.`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            } else {
              usuarios.restar(`${usuario.id}.xp.${interaction.guild.id}.puntos`, cantidad)
              var embed = new Discord.MessageEmbed()
                .setDescription(`Has restado \`${cantidad} XP\` a <@!${usuario.id}>`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            }
          } else if (act=="multiplicar") {
            var cuanty = await usuarios.obtener(`${usuario.id}.xp.${interaction.guild.id}.puntos`)
            var x = Math.floor(cuanty*cantidad)
            usuarios.establecer(`${usuario.id}.xp.${interaction.guild.id}.puntos`, x)
            var embed = new Discord.MessageEmbed()
              .setDescription(`Has multiplicado por \`${cantidad}\` el XP de <@!${usuario.id}>\nAhora tiene \`${x} XP\``)
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
          } else if (act=="dividir") {
            var cuanty = await usuarios.obtener(`${usuario.id}.xp.${interaction.guild.id}.puntos`)
            var x = Math.floor(cuanty/cantidad)
            usuarios.establecer(`${usuario.id}.xp.${interaction.guild.id}.puntos`, x)
            var embed = new Discord.MessageEmbed()
              .setDescription(`Has dividido entre \`${cantidad}\` el XP de <@!${usuario.id}>\nTras el redondeo, se ha quedado con \`${x} XP\``)
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
          } else {
            require("../../../modulos_error/start").interact(client, interaction, "01", "si", "Error en la programación", "reply") 
          }
        }
      }
      require("../../../modulos_niveles/msg").level(client, interaction)
    } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply") }
  }
}