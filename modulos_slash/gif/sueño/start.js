const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    let gifs = ['https://media.giphy.com/media/LPgD2kZP5GVCn9DPlV/giphy.gif','https://media.giphy.com/media/l2vrxNmOGCv5QN8x74/giphy.gif','https://media.giphy.com/media/mEVQjy2F8AFfr81sOh/giphy.gif','https://media.giphy.com/media/TKL5TkbapzO27STm5c/giphy.gif']
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> tiene sueño`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}