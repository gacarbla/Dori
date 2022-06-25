const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios_db = new megadb.crearDB('usuarios')
const memo = new megadb.memoDB("memo_usuario")

module.exports = {
  run: async (client, interaction) => {
    try {
      var visibilidad = interaction.options.getString('visibilidad');
      var array = ""
      var array = await usuarios_db.keys()
      var i = 0
      var membros = []
      for (i=0;i<array.length;i++) {
        if (usuarios_db.has(`${array[i]}.dinero.${interaction.guild.id}`)){
          membros.push(array[i])
        }
      }
      var i = 0
      let dinero = []
      for (i=0;i<membros.length;i++){
        if (usuarios_db.has(`${membros[i]}.dinero.${interaction.guild.id}`)){
          try {
            var cartera = await usuarios_db.obtener(`${membros[i]}.dinero.${interaction.guild.id}.cartera`)
            var banco = await usuarios_db.obtener(`${membros[i]}.dinero.${interaction.guild.id}.banco`)
            var diñeiro = Math.floor(cartera+banco)
            dinero.push(diñeiro)
          } catch {
            dinero.push(0)
          }
        }
      }
      var i = 0
      for (i=0;i<membros.length;i++){
        memo.establecer(`${membros[i]}`, dinero[i])
      }
      var rank = await memo.ordenar(false, false)
      var ranking = []
      var num = 1
      rank.forEach(v => {
        ranking.push(`**${num}º** <@!${v.clave}> [\`${v.valor} ₪\`]`)
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
        .setTitle("RANKING ECONOMÍA - TOP 15")
        .setDescription(`${ranking_15.join("\n")}`)
        .setColor(0x5865f2)
      if (visibilidad=="true") {
        await interaction.reply({embeds: [embed], ephemeral: true}).catch((e)=>{require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")})
      } else {
        await interaction.reply({embeds: [embed]}).catch((e)=>{require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")})
      }
      
    } catch (e) { require("../../../startmodulos_error/start").interact(client, interaction, "01", "si",  e, "reply") }
  }
}