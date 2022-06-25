const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    try {
    let perm = interaction.member.permissions.has('MANAGE_MESSAGES')||interaction.member.id==='643575943289634836'
    if(!perm){
      require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
    } else if (perm) {
        const texto = interaction.options.getString('texto');
        const canal = interaction.options.getChannel('canal');
        if(canal.type === 'GUILD_TEXT' || canal.type === 'GUILD_NEWS' || canal.type === 'GROUP_DM' || canal.type === 'GUILD_STORE' || canal.type === 'GUILD_NEWS_THREAD' || canal.type === 'GUILD_PUBLIC_THREAD' || canal.type === 'GUILD_PRIVATE_THREAD'){
        var embed = new Discord.MessageEmbed()
            .setDescription('Mensaje enviado')
            .setColor(0x5865f2)
          try{
            client.channels.resolve(`${canal.id}`).send({content: `${texto}`})
            await interaction.reply({embeds: [embed], ephemeral: true}).catch(()=>{return})
          } catch (e) {
            require("../../../modulos_error/start").interact(client, interaction, "43", "no",  "", "reply")
          }
        } else {
          require("../../../modulos_error/start").interact(client, interaction, "55", "no",  "", "reply")
        }
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}