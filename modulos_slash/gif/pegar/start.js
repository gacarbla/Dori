const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction)=>{
    var usuario = interaction.options.getUser('usuario');
    let gifs = ['https://media.giphy.com/media/WoQlGMtS1bFuN86gxv/giphy.gif','https://media.giphy.com/media/43bOrDOasXG6Y/giphy.gif','https://media.giphy.com/media/43bOrDOasXG6Y/giphy.gif','https://media.giphy.com/media/2IaSJU2TMn2xi/giphy.gif','https://media.giphy.com/media/g1Xqe2MUwkHBam802e/giphy.gif',]
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> le ha dado un buen golpe a ${usuario}`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}