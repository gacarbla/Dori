const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    var usuario = interaction.options.getMember('usuario');
    let perm = interaction.member.permissions.has('ADMINISTRATOR')||interaction.member.id==='643575943289634836'
    if(!perm){
      require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
    } else {
      var embed = new Discord.MessageEmbed()
      if(!usuarios.has(`${usuario.id}.advertencias.${interaction.guild.id}`)){
        embed.setDescription("Vaya, al parecer este usuario no tiene ninguna advertencia que borrar").setColor(0xed4245)
      } else {
        usuarios.establecer(`${usuario.id}.advertencias.${interaction.guild.id}`,{numero:0,motivos:[]})
        embed.setDescription("¡ÉXITO!\nSe han borrado las advertencias de este usuario en el servidor").setColor(0x5865f2)
        var embed_priv = new Discord.MessageEmbed().setTitle("SE HAN LIMPIADO TUS ADVERTENCIAS").setDescription(`Tus advertencias en el servidor \`${interaction.guild.name}\` han sido eliminadas por ${interaction.user.username}#${interaction.user.discriminator}`).setColor(0x5865f2)
        var embed_serv = new Discord.MessageEmbed().setTitle("SE HAN LIMPIADO TUS ADVERTENCIAS").setDescription(`Tus advertencias en este servidor han sido eliminadas por ${interaction.user.username}#${interaction.user.discriminator}`).setColor(0x5865f2)
        var obj = {title: "SE HAN LIMPIADO TUS ADVERTENCIAS", description: `Tus advertencias en el servidor \`${interaction.guild.name}\` han sido eliminadas por ${interaction.user.username}#${interaction.user.discriminator}`}
        require("../../../modulos_notify/start").run(client, interaction, usuario.id, embed_priv, embed_serv, obj)
      }
      await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
    }
  }
}