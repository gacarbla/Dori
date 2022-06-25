const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    try{
      var miembro = interaction.options.getMember('usuario');
      var usuario = interaction.options.getUser('usuario');
      let perm = interaction.member.permissions.has('MANAGE_MESSAGES')||interaction.member.id==='643575943289634836'
      if(!perm){
        require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
      } else if (perm) {
          var advertencias_n_bruto = await usuarios.obtener(`${miembro.id}.advertencias.${interaction.guild.id}.numero`)
          var advertencias_l_bruto = await usuarios.obtener(`${miembro.id}.advertencias.${interaction.guild.id}.motivos`)
          var advertencias_n = advertencias_n_bruto || "0"
          var advertencias_l = advertencias_l_bruto || ['No se han encontrado motivos por los que se le haya advertido']
          let Dd = usuario.createdAt
          var apodo = miembro.nickname || '*(No tiene apodo)*'
          var embed = new Discord.MessageEmbed()
            .setThumbnail(usuario.avatarURL())
            .addField('Usuario:', usuario.username+'#'+usuario.discriminator, true)
            .addField('Mención:', `<@!${miembro.id}>`, true)
            .addField('Apodo:', apodo, true)
            .addField('ID:', miembro.id, true)
            .addField('Entrada en Discord:', Dd.getDate()+'/'+Math.floor((Dd.getMonth())-(-1))+'/'+Dd.getFullYear()+' ** **-** ** '+Dd.getHours()+':'+Dd.getMinutes(), true)
            .addField('Advertid@:', `${advertencias_n} veces`, true)
            .addField('Sus advertencias:', `· ${advertencias_l.join('\n· ')}`)
            .addField('Roles:', miembro.roles.cache.map(role => role.toString()).join(" \| "), false)
            .setColor(0x5865f2)
          await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{
            return
          })
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}