const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')
const empleos = new megadb.crearDB('empleos')

module.exports = {
  run: async (client, interaction) => {
    try {
      if(!usuarios.has(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`)) {
        usuarios.establecer(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`, 0)
      }
      var carcel = await usuarios.obtener(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`)
      if(carcel<Date.now()){
        usuarios.sumar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 0.5)
        const empleo = interaction.options.getString('profesión');
        var reputacion = await usuarios.obtener(`${interaction.member.id}.reputacion.${interaction.guild.id}`)
        var aleatorio = Math.floor(Math.random()*100)
        if(empleo=="cajero_supermercado"){
          if(aleatorio<reputacion){
            usuarios.establecer(`${interaction.member.id}.trabajo.${interaction.guild.id}`, "cajero_supermercado")
            var embed = new Discord.MessageEmbed()
              .setDescription('Has ido a la entrevista para trabajar en un supermercado y te han aceptado.')
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true})
          } else {
            var embed = new Discord.MessageEmbed()
              .setDescription('Has ido a la entrevista para trabajar en un supermercado pero no te han aceptado.\nAl parecer buscan otro tipo de persona.')
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true})
          }
        } else if(empleo=="camarero"){
          if(aleatorio<reputacion){
            usuarios.establecer(`${interaction.member.id}.trabajo.${interaction.guild.id}`, "camarero")
            var embed = new Discord.MessageEmbed()
              .setDescription('Has ido a la entrevista para trabajar en un bar y te han aceptado.')
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true})
          } else {
            var embed = new Discord.MessageEmbed()
              .setDescription('Has ido a la entrevista para trabajar en un bar pero no te han aceptado.\nAl parecer buscan otro tipo de persona.')
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true})
          }
        } else if(empleo=="basurero"){
          if(aleatorio<reputacion){
            usuarios.establecer(`${interaction.member.id}.trabajo.${interaction.guild.id}`, "basurero")
            var embed = new Discord.MessageEmbed()
              .setDescription('Has ido a la entrevista para trabajar en la recogida de residuos y te han aceptado.')
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true})
          } else {
            var embed = new Discord.MessageEmbed()
              .setDescription('Has ido a la entrevista para trabajar en la recogida de residuos pero no te han aceptado.\nAl parecer buscan otro tipo de persona.')
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true})
          }
        } else {
          var estudios = []
          if (usuarios.has(`${interaction.member.id}.estudios.${interaction.guild.id}`)) {
            var estudios = await usuarios.obtener(`${interaction.member.id}.estudios.${interaction.guild.id}`)
          }
          if(estudios.includes(`${empleo}`)) {
            if(aleatorio<reputacion){
              usuarios.establecer(`${interaction.member.id}.trabajo.${interaction.guild.id}`, empleo)
              var embed = new Discord.MessageEmbed()
                .setDescription(`Has ido a la entrevista para trabajar de ${empleo} y te han aceptado.`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true})
            } else {
              var embed = new Discord.MessageEmbed()
                .setDescription(`Has ido a la entrevista para trabajar de ${empleo} pero no te han aceptado.\nAl parecer buscan otro tipo de persona.`)
                .setColor(0x5865f2)
              await interaction.reply({embeds: [embed], ephemeral: true})
            }
          } else {
            var embed = new Discord.MessageEmbed()
              .setDescription('Has ido a la entrevista, pero no has sido aceptad@ porque no tienes los estudios necesarios.')
              .setColor(0xed4245)
            await interaction.reply({embeds: [embed], ephemeral: true})
          }
        }
      } else {
        usuarios.sumar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 0.05)
        var ms_restante = Math.floor(carcel-Date.now())
        var días_restante = Math.floor(ms_restante/86400000)
        var horas_restante = Math.floor((ms_restante%86400000)/3600000)
        var minutos_restante = Math.floor(((ms_restante/1000)/60)%60)
        var segundos_restante = Math.floor((ms_restante/1000)%60)
        var embed = new Discord.MessageEmbed()
          .setDescription('No puedes buscar trabajo en la cárcel')
          .setFooter('Tiempo restante: '+días_restante+' días '+horas_restante+' horas '+minutos_restante+' minutos '+segundos_restante+' segundos')
          .setColor(0xed4245)
        await interaction.reply({embeds: [embed], ephemeral: true})
      }
    } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply") }
  }
}