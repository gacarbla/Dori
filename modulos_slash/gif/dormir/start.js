const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    let gifs = ['https://media.giphy.com/media/Jap1tdjahS0rm/giphy.gif', 'https://media.giphy.com/media/xTiTnf9SCIVk8HIvE4/giphy.gif', 'https://media.giphy.com/media/aeu60CPZd8zw4/giphy.gif', 'https://media.giphy.com/media/3ohze0k1Z43jsEJMCQ/giphy.gif']
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> está dormid@`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}