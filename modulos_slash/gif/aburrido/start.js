const Discord = require('discord.js')

module.exports = {
  /* Última actualización de gifs: 12/12/2021 */
  run: async (client, interaction) => {
    let gifs = [
      'https://media.giphy.com/media/tuxc9Th08v4Uo/giphy.gif',
      'https://media.giphy.com/media/q9EUjcUOT1aYE/giphy.gif',
      'https://media.giphy.com/media/nr2qDJWcgnsjK/giphy.gif',
      'https://media.giphy.com/media/FW2AnPtYQF3A4/giphy.gif',
      'https://media.giphy.com/media/45aI9YiKOI6CdmxPhi/giphy.gif',
      'https://media.giphy.com/media/45aI9YiKOI6CdmxPhi/giphy.gif',
      'https://media.giphy.com/media/gHw3C5n5IfRWU/giphy.gif',
    ]
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> está aburrid@`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}
