const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction)=>{
    var usuario = interaction.options.getUser('usuario');
    let gifs = ['https://media.giphy.com/media/QX26hw37ZXORAWNxyC/giphy.gif', 'https://media.giphy.com/media/8VR88d4XXCdBS/giphy.gif', 'https://media.giphy.com/media/dPuGTJMonKHbG/giphy.gif', 'https://media.giphy.com/media/1jl9MRpZyup3BlHF3F/giphy.gif'] 
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    var embed = new Discord.MessageEmbed()
      .setDescription(`<@!${interaction.member.id}> ha disparado a ${usuario}\n¡Que alguien llame a la policía!`)
      .setImage(gif)
      .setColor(0xeb459e)
    await interaction.reply({embeds: [embed], ephemeral: false });
  }
}