const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction)=>{
    var usuario = interaction.options.getUser('usuario');
    if(!usuario){
      let gifs = ['https://media.giphy.com/media/d2ItDZZumUI6Y/giphy.gif','https://media.giphy.com/media/3osxY7eI6enqNBo2mQ/giphy.gif','https://media.giphy.com/media/MZpfQzzp1vSskhl8MV/giphy.gif','https://media.giphy.com/media/1UYuj0yPcWOn0xbNpk/giphy.gif','https://media.giphy.com/media/mUHyDqFpPmEEg/giphy.gif',]
      let rand = Math.floor(Math.random() * gifs.length)
      let gif = gifs[rand]
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${interaction.member.id}> está comiendo`)
        .setImage(gif)
        .setColor(0xeb459e)
      await interaction.reply({embeds: [embed], ephemeral: false });
    } else {
      let gifs = ['https://media.giphy.com/media/jTV8AEmfhqBmlPl1fb/giphy.gif','https://media.giphy.com/media/hMQNTnOnLDsmEVn1VV/giphy.gif','https://media.giphy.com/media/h8wRyrYXAt0Dm/giphy.gif',]
      let rand = Math.floor(Math.random() * gifs.length)
      let gif = gifs[rand]
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${interaction.member.id}> está intentando comer a ${usuario}\n¡Que alguien le detenga!`)
        .setImage(gif)
        .setColor(0xeb459e)
      await interaction.reply({embeds: [embed], ephemeral: false });
    }
  }
}