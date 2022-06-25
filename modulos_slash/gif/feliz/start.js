const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    let gifs = ['https://media.giphy.com/media/3oz8xRF0v9WMAUVLNK/giphy.gif','https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif','https://media.giphy.com/media/l7fdqmHQ1jCg2HzQlx/giphy.gif','https://media.giphy.com/media/rdma0nDFZMR32/giphy.gif','https://media.giphy.com/media/MeIucAjPKoA120R7sN/giphy.gif',]
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> está feliz`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}