const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    let gifs = ['https://media.giphy.com/media/11tTNkNy1SdXGg/giphy.gif','https://media.giphy.com/media/3o9bJX4O9ShW1L32eY/giphy.gif','https://media.giphy.com/media/XEVHFzjPzjQy1uCulo/giphy.gif','https://media.giphy.com/media/MLhIi4DoxeUjC/giphy.gif','https://media.giphy.com/media/ZebTmyvw85gnm/giphy.gif','https://media.giphy.com/media/OOezqqxPB8aJ2/giphy.gif','https://media.giphy.com/media/26uf1EUQzKKGcIhJS/giphy.gif','https://media.giphy.com/media/aNFT7eG2rIKK715uLk/giphy.gif']
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> se ha enfadado`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}