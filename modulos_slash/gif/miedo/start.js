const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    let gifs = ['https://media.giphy.com/media/XggJZ026mJQ7fVaQ7j/giphy.gif','https://media.giphy.com/media/Uu04Aiju5cLOb62Gar/giphy.gif','https://media.giphy.com/media/Qusk13zvbkcklvFS4K/giphy.gif','https://media.giphy.com/media/fYfHCoXOjRgW686JZd/giphy.gif','https://media.giphy.com/media/2Mkc4Yn4426mZp2hII/giphy.gif','https://media.giphy.com/media/37xVGE3HIrCl7X0BT7/giphy.gif','https://media.giphy.com/media/rgN0X7tHOq5tXQzfNs/giphy.gif',]
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> tiene miedo`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}