const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction)=>{
    var usuario = interaction.options.getUser('usuario');
    let gifs = ['https://media.giphy.com/media/l3V0j3ytFyGHqiV7W/giphy.gif', 'https://media.giphy.com/media/LICtqQ1K8ClIQ/giphy.gif', 'https://media.giphy.com/media/MU1gQlfzyi7qE/giphy.gif', 'https://media.giphy.com/media/Ur7br2RDlMlZQzuwUK/giphy.gif', 'https://media.giphy.com/media/qj2PmcYresyfS/giphy.gif']
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> le ha dado una patada a ${usuario}`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}