const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction)=>{
    var usuario = interaction.options.getUser('usuario');
    let gifs = ['https://media.giphy.com/media/l0Ex1KLj8NMX7YS1W/giphy.gif', 'https://media.giphy.com/media/Xr4qm0jwJv1AfXgf5B/giphy.gif', 'https://media.giphy.com/media/UtcEVZQUaZ9okaYX8m/giphy.gif', 'https://media.giphy.com/media/mpdNxvbxee5yw/giphy.gif', 'https://media.giphy.com/media/yV5xcSTmtVPBS/giphy.gif', 'https://media.giphy.com/media/w1XrYq5PsCbyE/giphy.gif', 'https://media.giphy.com/media/VbQOyskSlIJhxYj3UR/giphy.gif', 'https://media.giphy.com/media/4WF4YilkoC7sjzG3TY/giphy.gif', 'https://media.giphy.com/media/3d2qz22M912oEqDNAr/giphy.gif', 'https://media.giphy.com/media/8FVEaTui9MLNjBdjBm/giphy.gif', 'https://media.giphy.com/media/nJIWGSNwaOBO/giphy.gif', 'https://media.giphy.com/media/uYOgd0l1uRVbq/giphy.gif', 'https://media.giphy.com/media/1twiwUPYhZjJPwf3OW/giphy.gif', 'https://media.giphy.com/media/UvprZ6k6CCDvUk5de6/giphy.gif'] 
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> le está enseñando el dedito a ${usuario}`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}