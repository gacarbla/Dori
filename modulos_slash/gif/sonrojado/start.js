const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    let gifs = ['https://media.giphy.com/media/23fsBjmnPUCzLNKxJl/giphy.gif','https://media.giphy.com/media/4CFjzDix8jacE/giphy.gif','https://media.giphy.com/media/fGCDk8sL39ZPAeaGvw/giphy.gif','https://media.giphy.com/media/7nlbYoryJoV6o/giphy.gif','https://media.giphy.com/media/wkW0maGDN1eSc/giphy.gif','https://media.giphy.com/media/28AEi3TIvtSP6/giphy.gif','https://media.giphy.com/media/uU8IHAFVDVhks/giphy.gif',]
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> se ha sonrojado   0///0`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}