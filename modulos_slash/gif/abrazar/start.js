const Discord = require('discord.js')

module.exports = {
  /* Última actualización de gifs: 29/09/2021 */
  run: async (client, interaction)=>{
    var usuario = interaction.options.getUser('usuario');
    let gifs = [
      "https://media.giphy.com/media/IRUb7GTCaPU8E/giphy.gif",
      "https://media.giphy.com/media/qscdhWs5o3yb6/giphy.gif",
      "https://media.giphy.com/media/3bqtLDeiDtwhq/giphy.gif",
      "https://media.giphy.com/media/u9BxQbM5bxvwY/giphy.gif",
      "https://media.giphy.com/media/C4gbG94zAjyYE/giphy.gif",
      "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif",
      "https://media.giphy.com/media/5eyhBKLvYhafu/giphy.gif",
      "https://media.giphy.com/media/HaC1WdpkL3W00/giphy.gif",
      "https://media.giphy.com/media/fLv2F5rMY2YWk/giphy.gif",
      "https://media.giphy.com/media/vVA8U5NnXpMXK/giphy.gif",
      "https://media.giphy.com/media/lrr9rHuoJOE0w/giphy.gif",
      "https://media.giphy.com/media/EGauSkKQZuXxS/giphy.gif",
      "https://media.giphy.com/media/ZQN9jsRWp1M76/giphy.gif",
      "https://media.giphy.com/media/QFPoctlgZ5s0E/giphy.gif",
      "https://media.giphy.com/media/svXXBgduBsJ1u/giphy.gif",
      "https://media.giphy.com/media/wSY4wcrHnB0CA/giphy.gif",
      "https://media.giphy.com/media/RFxE6d7EuTCgw/giphy.gif",
    ]
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> le ha dado un abrazo a ${usuario}`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}