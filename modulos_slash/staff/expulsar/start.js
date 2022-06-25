const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    try {
      let perm = interaction.member.permissions.has('KICK_MEMBERS')||interaction.member.id==='643575943289634836'
      if(!perm){
        require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
      } else {
        const miembro = interaction.options.getMember('usuario');
        const usuario = interaction.options.getUser('usuario');
        const razón = interaction.options.getString('razón') || 'No se ha especificado ninguna razón'
        if(!miembro.kickable){
          require("../../../modulos_error/start").interact(client, interaction, "43", "no",  "", "reply")
        } else {
          miembro.kick(razón)
          var embed = new Discord.MessageEmbed()
            .setTitle('USUARIO EXPULSADO')
            .addField('Usuario:', `${usuario.username}#${usuario.discriminator} (${usuario.id})`)
            .addField('Moderador:', `<@!${interaction.member.id}>`)
            .addField('Razón:', `${razón}`)
            .setColor(0x5865f2)
          await interaction.reply({embeds: [embed], ephemeral: false}).catch(()=>{return})
        }
      }
    } catch {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}