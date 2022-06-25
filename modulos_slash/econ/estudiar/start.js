const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')
const estudios_db = new megadb.crearDB('estudios')

module.exports = {
  run: async (client, interaction) =>{
    try {
      if(!usuarios.has(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`)) {
        usuarios.establecer(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`, 0)
      }
      var carcel = await usuarios.obtener(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`)
      if(carcel<Date.now()){
        const estudiar = interaction.options.getString('profesión');
        let estudiado = "no"
        if(usuarios.has(`${interaction.member.id}.estudios.${interaction.guild.id}`)){
          var estudios = await usuarios.obtener(`${interaction.member.id}.estudios.${interaction.guild.id}`)
          if(estudios.includes(`${estudiar}`)){
            estudiado = "si"
          }
        }
        if(estudiado=="si"){
          var embed = new Discord.MessageEmbed()
            .setDescription("¡Ya tienes este título!")
            .setColor(0xed4245)
          await interaction.reply({embeds: [embed], ephemeral: true})
        } else {
          var dinero = await usuarios.obtener(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)
          var coste = await estudios_db.obtener(`${estudiar}`)
          if(dinero<coste){
            var embed = new Discord.MessageEmbed()
              .setDescription("Parece ser que no tienes dinero para poder matricularte...\nVe al banco y retira `"+coste+"$`")
              .setColor(0xed4245)
            await interaction.reply({embeds: [embed], ephemeral: true})
          } else if(usuarios.has(`${interaction.member.id}.items.${interaction.guild.id}.material_escolar`)){
            try {
              usuarios.restar(`${interaction.member.id}.items.${interaction.guild.id}.material_escolar`, 1)
              usuarios.restar(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`, coste)
              var embed = new Discord.MessageEmbed()
                .setDescription(`Acabas de sacarte un título de ${estudiar}`)
                .setColor(0x5865f2)
              if(usuarios.has(`${interaction.member.id}.estudios.${interaction.guild.id}`)){
                usuarios.push(`${interaction.member.id}.estudios.${interaction.guild.id}`, `${estudiar}`)
              } else {
                usuarios.establecer(`${interaction.member.id}.estudios.${interaction.guild.id}`, [`${estudiar}`])
              }
              await interaction.reply({embeds: [embed], ephemeral: true})
            } catch {
              async (e) => {
                var embed = new Discord.MessageEmbed()
                  .setDescription("**ERROR 01**\n```\n"+e+"\n```")
                  .setFooter('Para ver la definición concreta del error, use el comando /error')
                  .setColor(0xed4245)
                await interaction.reply({embeds: [embed], ephemeral: true})
              }
            }
          } else {
            var embed = new Discord.MessageEmbed()
              .setDescription("Parece ser que no tienes material para poder estudiar...\nVe a la tienda y compra **`Material escolar`**")
              .setColor(0xed4245)
            await interaction.reply({embeds: [embed], ephemeral: true})
          }
        }
      } else {
        usuarios.restar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 0.5)
        var ms_restante = Math.floor(carcel-Date.now())
        var días_restante = Math.floor(ms_restante/86400000)
        var horas_restante = Math.floor((ms_restante%86400000)/3600000)
        var minutos_restante = Math.floor(((ms_restante/1000)/60)%60)
        var segundos_restante = Math.floor((ms_restante/1000)%60)
        var embed = new Discord.MessageEmbed()
          .setDescription('Al parecer en esta cárcel no puedes estudiar')
          .setFooter('Tiempo restante: '+días_restante+' días '+horas_restante+' horas '+minutos_restante+' minutos '+segundos_restante+' segundos')
          .setColor(0xed4245)
        await interaction.reply({embeds: [embed], ephemeral: true})
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply")
    }
  }
}