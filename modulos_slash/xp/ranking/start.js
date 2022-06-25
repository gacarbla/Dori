const Discord = require('discord.js');
const megadb = require('megadb');
const usuarios_db = new megadb.crearDB('usuarios');
const servidores = new megadb.crearDB('servidores');

module.exports = {
  run: async (client, interaction) => {
    try {
      if (!servidores.has(`${interaction.guild.id}.niveles.estado`)){
        servidores.establecer(`${interaction.guild.id}.niveles`, {estado: "off", max: 25, min: 5})
      }
      var estado = await servidores.obtener(`${interaction.guild.id}.niveles.estado`)
      var embed = new Discord.MessageEmbed().setDescription("Al parecer este servidor tiene el sistema de niveles desactivado").setColor(0xed4245)
      if (estado!=="on") return await interaction.reply({embeds: [embed], ephemeral: true})
      var visibilidad = interaction.options.getString('visibilidad');
      var array = ""
      var array = await usuarios_db.keys()
      var i = 0
      var membros = []
      for (i=0;i<array.length;i++) {
        if (usuarios_db.has(`${array[i]}.xp.${interaction.guild.id}.puntos`)){
          membros.push(array[i])
        }
      }
      var i = 0
      let xp = []
      let lvl = []
      for (i=0;i<membros.length;i++){
        if (usuarios_db.has(`${membros[i]}.xp.${interaction.guild.id}.puntos`)){
          try {
            var exp = await usuarios_db.obtener(`${membros[i]}.xp.${interaction.guild.id}.puntos`)
            xp.push(exp)
          } catch {
            xp.push(0)
          }
        } else {
          xp.push(0)
        }
        if (usuarios_db.has(`${membros[i]}.xp.${interaction.guild.id}.nivel`)){
          try {
            var nvl = await usuarios_db.obtener(`${membros[i]}.xp.${interaction.guild.id}.nivel`)
            lvl.push(nvl)
          } catch {
            lvl.push(0)
          }
        } else {
          lvl.push(0)
        }
      }
      var i = 0
      let memo = []
      for (i=0;i<membros.length;i++){
        memo.push({id: membros[i], xp: xp[i], lvl: lvl[i]})
      }
      memo = memo.sort(function(a, b) {
        if (a.xp > b.xp) {
          return 1
        }
        if (a.xp > b.xp) {
          return -1
        }
        return 0
      })
      var ranking = []
      var num = 1
      memo.forEach(v => {
        var num2 = Math.floor(num-1)
        ranking.push(`**${num}º** <@!${memo[num2].id}> [\`${memo[num2].xp} XP\`] [\`Nivel ${memo[num2].lvl}\`]`)
        num++
      })
      var i = 0
      var ranking_15 = []
      for (i=0;i<15;i++){
        if(!ranking[i]){
          break
        } else if (ranking[i] == ""){
          break
        } else {
          ranking_15[i] = ranking[i]
        }
      }
      var embed = new Discord.MessageEmbed()
        .setTitle(`RANKING XP - TOP ${i}`)
        .setDescription(`${ranking_15.join("\n")}`)
        .setColor(0x5865f2)
      if (visibilidad=="true") {
        await interaction.reply({embeds: [embed], ephemeral: true}).catch((e)=>{require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")})
      } else {
        await interaction.reply({embeds: [embed]}).catch((e)=>{require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")})
      }
      
    } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply") }
  }
}