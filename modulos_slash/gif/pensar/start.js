const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction)=>{
    var usuario = interaction.options.getUser('usuario');
    if(!usuario){
      let gifs = ['https://media.giphy.com/media/gEvab1ilmJjA82FaSV/giphy.gif','https://media.giphy.com/media/872o15eAXFBw66UfNl/giphy.gif','https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif','https://media.giphy.com/media/8acGIeFnqLA7S/giphy.gif','https://media.giphy.com/media/kQ3FSVoJrkYWk/giphy.gif','https://media.giphy.com/media/a5viI92PAF89q/giphy.gif','https://media.giphy.com/media/p24IfoBi3ojRgNhnMu/giphy.gif','https://media.giphy.com/media/26xBty29Tq2i8CCVa/giphy.gif']
      let rand = Math.floor(Math.random() * gifs.length)
      let gif = gifs[rand]
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${interaction.member.id}> está pensando`)
        .setImage(gif)
        .setColor(0xeb459e)
      await interaction.reply({embeds: [embed], ephemeral: false });
    } else {
      let gifs = ['https://media.giphy.com/media/10w1WtyF41XmzS/giphy.gif','https://media.giphy.com/media/XxoSsAOm4KkJW/giphy.gif','https://media.giphy.com/media/ZdlH8oCFlMa2WLDicc/giphy.gif',]
      let rand = Math.floor(Math.random() * gifs.length)
      let gif = gifs[rand]
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${interaction.member.id}> está pensando en ${usuario} :heart:`)
        .setImage(gif)
        .setColor(0xeb459e)
      await interaction.reply({embeds: [embed], ephemeral: false });
    }
  }
}