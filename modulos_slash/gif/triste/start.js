const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    let gifs = ['https://media.giphy.com/media/dJYoOVAWf2QkU/giphy.gif','https://media.giphy.com/media/BEob5qwFkSJ7G/giphy.gif','https://media.giphy.com/media/l1KVaj5UcbHwrBMqI/giphy.gif','https://media.giphy.com/media/qQdL532ZANbjy/giphy.gif','https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif','https://media.giphy.com/media/a9xhxAxaqOfQs/giphy.gif',]
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> está triste`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}