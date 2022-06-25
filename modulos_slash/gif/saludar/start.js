const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction)=>{
    var usuario = interaction.options.getUser('usuario');
    if(!usuario){
      let gifs = ['https://media.giphy.com/media/1lk1IcVgqPLkA/giphy.gif', 'https://media.giphy.com/media/gKmwTEH4vyd2M/giphy.gif', 'https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif', 'https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif', 'https://media.giphy.com/media/bcKmIWkUMCjVm/giphy.gif']
      let rand = Math.floor(Math.random() * gifs.length)
      let gif = gifs[rand]
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${interaction.member.id}> os saluda`)
        .setImage(gif)
        .setColor(0xeb459e)
      await interaction.reply({embeds: [embed], ephemeral: false });
    } else {
      let gifs = ['https://media.giphy.com/media/h8aPnR9wFT5kddMk9U/giphy.gif', 'https://media.giphy.com/media/eHpWHuEUxHIre/giphy.gif', 'https://media.giphy.com/media/RMHzIk780QpxFb3efe/giphy.gif'] 
      let rand = Math.floor(Math.random() * gifs.length)
      let gif = gifs[rand]
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${interaction.member.id}> está saludando a ${usuario}`)
        .setImage(gif)
        .setColor(0xeb459e)
      await interaction.reply({embeds: [embed], ephemeral: false });
    }
  }
}