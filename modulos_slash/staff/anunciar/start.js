const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    try {
      let perm = interaction.member.permissions.has('MANAGE_MESSAGES')
    if(!perm){
      require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
    } else {
        const título = interaction.options.getString('título');
        const texto = interaction.options.getString('texto');
        const canal = interaction.options.getChannel('canal');
        if(canal.type === 'GUILD_TEXT' || canal.type === 'GUILD_NEWS' || canal.type === 'GROUP_DM' || canal.type === 'GUILD_STORE' || canal.type === 'GUILD_NEWS_THREAD' || canal.type === 'GUILD_PUBLIC_THREAD' || canal.type === 'GUILD_PRIVATE_THREAD'){
          try{
            var anuncio = new Discord.MessageEmbed()
              .setAuthor(`Anuncio de ${interaction.user.username}`, interaction.user.avatarURL())
              .setTitle(`${título}`)
              .setDescription(`${texto}`)
              .setColor(0x5865f2);
            client.channels.resolve(`${canal.id}`).send({embeds: [anuncio]});
            var embed = new Discord.MessageEmbed()
              .setDescription('Mensaje enviado')
              .setColor(0x5865f2);
            await interaction.reply({embeds: [embed], ephemeral: true})
          } catch {
            require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
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