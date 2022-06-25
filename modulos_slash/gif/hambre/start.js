const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    let gifs = ['https://media.giphy.com/media/vdbrUjzrUEGly/giphy.gif','https://media.giphy.com/media/GRtSaXqmHKFAA/giphy.gif','https://media.giphy.com/media/l4EoMN9qjAOaaAcNO/giphy.gif','https://media.giphy.com/media/UTkm6euG3wabBiUeQu/giphy.gif','https://media.giphy.com/media/l4xyzDicw7Uaiuu8E/giphy.gif']
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> tiene hambre`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}