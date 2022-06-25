const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction)=>{
    var usuario = interaction.options.getUser('usuario');
    let gifs = ['https://media.giphy.com/media/l4Ep0RBSxGWBsGPok/giphy.gif', 'https://media.giphy.com/media/8GiREm7aqMwN2/giphy.gif', 'https://media.giphy.com/media/rCDk9E3Szskus/giphy.gif', 'https://media.giphy.com/media/xwsuHAY3oLT68/giphy.gif', 'https://media.giphy.com/media/89AAoZicNaRsA/giphy.gif']  
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> ha lamido a ${usuario}\nEspero que se haya bañado hace poco`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}