const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    let perm = interaction.member.permissions.has('MANAGE_MESSAGES')||interaction.member.id==='643575943289634836'
    if(!perm){
      require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
    } else {
      const numero = interaction.options.getInteger('cantidad');
      if(numero<1){
        require("../../../modulos_error/start").interact(client, interaction, "24", "no",  "", "reply", "No se puede borrar este número de mensajes")
      } else if (numero>100){
        require("../../../modulos_error/start").interact(client, interaction, "23", "no",  "", "reply", "El número máximo de mensajes que puedo borrar son 100")
      } else {
        try{
          if(100===numero){
            interaction.channel.bulkDelete(100, true)
          } else {
            interaction.channel.bulkDelete(Math.floor(numero+1), true)
          }
          var embed = new Discord.MessageEmbed()
            .setDescription(`Se han eliminado los mensajes de ${interaction.channel}`)
            .setColor(0x5865f2)
          await interaction.reply({embeds: [embed], ephemeral: true }).catch(()=>{return})
        } catch (e) {
          require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
        }
      }
    }
  }
}