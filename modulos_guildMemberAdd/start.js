const Discord = require("discord.js")
const megadb = require("megadb")
const servidores = new megadb.crearDB('servidores')

module.exports = {
  run: async (client, member) => {
    try {
      if (member.id !== "643575943289634836" && member.id !== 643575943289634836 ) {
        if (servidores.has(`${member.guild.id}.blacklist.${member.id}`) && member.bannable) {
          var embed = new Discord.MessageEmbed()
            .setDescription("Al parecer la administración de este servidor te había prohibido la entrada y se te ha baneado automáticamente.")
            .setColor(0xed4245)
          if (servidores.has(`${member.guild.id}.blacklist.${member.id}.razon`)) {
            var razon = await servidores.has(`${member.guild.id}.blacklist.${member.id}.razon`)
            embed = embed.addField(`Motivo otorgado por la administración:`, `${razon}`)
          }
          client.users.resolve(member.id).send({embeds: [embed]}).catch(()=>{
            return
          })
          if(servidores.has(`${member.guild.id}.blacklist.${member.id}`) && member.bannable) {
            member.ban()
          }
        }
      }
    } catch { return }
    try {
      if (servidores.has(`${member.guild.id}.whitelist.${member.id}`) || member.id !== "643575943289634836") {
        var embed = new Discord.MessageEmbed()
          .setTitle("INFORMACIÓN")
          .setDescription("La administración de este servidor te ha declarado como usuario de confianza.")
          .setColor(0x5865f2)
        if(servidores.has(`${member.guild.id}.verify.rol`)){
          var rol = await servidores.obtener(`${member.guild.id}.verify.rol`)
          embed = embed.setDescription("La administración de este servidor te ha declarado como usuario de confianza.\nHas sido verificad@ automáticamente.")
          try { 
            member.roles.add(rol).catch(async(error)=>{
              embed = embed.setDescription("La administración de este servidor te ha declarado como usuario de confianza.\nSe te ha intentado verificar automáticamente pero algo ha fallado.")
            })
          } catch {
            embed = embed.setDescription("La administración de este servidor te ha declarado como usuario de confianza.\nSe te ha intentado verificar automáticamente pero algo ha fallado.")
          }
        }
        client.users.resolve(member.id).send({embeds: [embed]}).catch(()=>{return})
      }
    } catch { return }
  }
}