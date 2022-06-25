const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')
const moment = require('moment')

module.exports = {
  run: async (client, interaction) => {
    var motivo = interaction.options.getString('razón');
    var usuario = interaction.options.getMember('usuario');
    let perm = interaction.member.permissions.has('MANAGE_MESSAGES')||interaction.member.id==='643575943289634836'
    if(!perm){
      require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
    } else {
      var fecha = `${moment(Date.now()).date()}/${Math.floor(moment(Date.now()).month()+1)}/${moment(Date.now()).year()}`
      var razón = motivo || '*No se ha especificado ningún motivo*'
      if(!usuarios.has(`${usuario.id}.advertencias.${interaction.guild.id}`)){
        usuarios.establecer(`${usuario.id}.advertencias.${interaction.guild.id}`, {numero: 1, motivos: [razón]})
      } else {
        usuarios.sumar(`${usuario.id}.advertencias.${interaction.guild.id}.numero`, 1)
        usuarios.push(`${usuario.id}.advertencias.${interaction.guild.id}.motivos`, `${razón}`)
      }
      var embed = new Discord.MessageEmbed()
        .setTitle('Usuario advertido')
        .addField('Motivo:', `${razón}`)
        .setTimestamp()
        .setColor(0x5865f2)
      await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
      var advertencias_n = await usuarios.obtener(`${usuario.id}.advertencias.${interaction.guild.id}.numero`)
      var embed_priv = new Discord.MessageEmbed().setTitle("HAS SIDO ADVERTID@").setDescription(`${interaction.user.username}#${interaction.user.discriminator} te ha puesto tu ${advertencias_n}ª advertencia en \`${interaction.guild.name}\`\n${razón==='*No se ha especificado ningún motivo*'?"Al parecer no ha especificado el porqué":`Ha declarado la siguiente razón:\n${razón}`}`).setColor(0x5865f2)
      var embed_serv = new Discord.MessageEmbed().setTitle("HAS SIDO ADVERTID@").setDescription(`${interaction.user.username}#${interaction.user.discriminator} te ha puesto tu ${advertencias_n}ª advertencia en este servidor\n${razón==='*No se ha especificado ningún motivo*'?"Al parecer no ha especificado el porqué":`Ha declarado la siguiente razón:\n${razón}`}`).setColor(0x5865f2)
      var obj = {title: "HAS SIDO ADVERTID@", description: `${interaction.user.username}#${interaction.user.discriminator} te ha puesto tu ${advertencias_n}ª advertencia en \`${interaction.guild.name}\`\n${razón==='*No se ha especificado ningún motivo*'?"Al parecer no ha especificado el porqué":`Ha declarado la siguiente razón:\n${razón}`}`}
      require("../../../modulos_notify/start").run(client, interaction, usuario.id, embed_priv, embed_serv, obj)
    }
  }
}