const Discord = require('discord.js')
const megadb = require("megadb");
const comandos_slash = new megadb.crearDB('comandos_slash');
const servidores = new megadb.crearDB('servidores')

module.exports = {
  run: async (client, interaction) => {
    var modulo = interaction.options.getString('módulo');
    var cmd = interaction.options.getString('comando');
    var rol = interaction.options.getRole('rol');
    try {
      let perm = interaction.member.permissions.has('ADMINISTRATOR') || interaction.member.id === 643575943289634836
      if(!perm) {
        require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
      } else {

        if(!servidores.has(`${interaction.guild.id}.deshabilitado.mdl`)) {
          servidores.establecer(`${interaction.guild.id}.deshabilitado.mdl`, {})
        }
        
        if(!servidores.has(`${interaction.guild.id}.deshabilitado.cmd`)) {
          servidores.establecer(`${interaction.guild.id}.deshabilitado.cmd`, {})
        }

        if(!cmd){
          if(servidores.has(`${interaction.guild.id}.deshabilitado.mdl.${modulo}`)){
            var roles = await servidores.obtener(`${interaction.guild.id}.deshabilitado.mdl.${modulo}`)
            if (!roles.includes(rol.id)){
              servidores.push(`${interaction.guild.id}.deshabilitado.mdl.${modulo}`, rol.id)
              var embed = new Discord.MessageEmbed()
                .setDescription(`Se ha añadido ${rol} a la lista de roles que no tienen acceso a este módulo`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            } else {
              var embed = new Discord.MessageEmbed()
                .setDescription(`El rol ${rol} ya carecía de permisos de acceso a este módulo`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            }
          } else {
            try {
              var embed = new Discord.MessageEmbed()
                .setDescription(`El módulo **${modulo}** ha sido deshabilitado para todas aquellos usuarios que posean el rol ${rol}`)
                .setColor(0x5865f2)
              try {
                servidores.establecer(`${interaction.guild.id}.deshabilitado.mdl.${modulo}`, [rol.id])
                await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
              } catch (e) {
                require("../../../modulos_error/start").interact(client, interaction, "98", "si",  e, "reply")
              }
            } catch (e) {
              require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
            }
          }
        } else {

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
          var embed = new Discord.MessageEmbed()
            .setDescription("Estamos trabajando en esta nueva función.\nPor el momento no está permitido hacer uso del campo \"comando\"")
            .setColor(0xed4245)
          await interaction.reply({embeds: [embed], ephemeral: true})
          /*
          if(servidores.has(`${interaction.guild.id}.deshabilitado.cmd.${cmd}`)){
            var roles = await servidores.obtener(`${interaction.guild.id}.deshabilitado.cmd.${cmd}`)
            if (!roles.includes(rol.id)){
              servidores.push(`${interaction.guild.id}.deshabilitado.cmd.${cmd}`, rol.id)
              var embed = new Discord.MessageEmbed()
                .setDescription(`Se ha añadido ${rol} a la lista de roles que no tienen acceso a este módulo`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            } else {
              var embed = new Discord.MessageEmbed()
                .setDescription(`El rol ${rol} ya carecía de permisos de acceso a este módulo`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
            }
          } else {
            try {
              var embed = new Discord.MessageEmbed()
                .setDescription(`El comando **${modulo} ${cmd}** ha sido deshabilitado para todas aquellos usuarios que posean el rol ${rol}`)
                .setColor(0x5865f2)
              try {
                servidores.establecer(`${interaction.guild.id}.deshabilitado.cmd.${cmd}`, [rol.id])
                await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
              } catch (e) {
                require("../../../modulos_error/start").interact(client, interaction, "98", "si",  e, "reply")
              }
            } catch (e) {
              require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
            }
          }
          */

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

        }
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}