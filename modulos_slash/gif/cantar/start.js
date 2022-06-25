const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction)=>{
    var usuario = interaction.options.getUser('usuario');
    if(!usuario){
      let gifs = ['https://media.giphy.com/media/l3fQueO8cHyZl2Pvi/giphy.gif','https://media.giphy.com/media/xT39D3tWC0jLA845s4/giphy.gif','https://media.giphy.com/media/2wcnv9rQzfTb2/giphy.gif','https://media.giphy.com/media/cJ5W8d9mJvrle6GzjO/giphy.gif','https://media.giphy.com/media/vOxiC0rt7hbs4/giphy.gif','https://media.giphy.com/media/13NUXIzsJOtl6w/giphy.gif',]
      let rand = Math.floor(Math.random() * gifs.length)
      let gif = gifs[rand]
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${interaction.member.id}> está cantando`)
        .setImage(gif)
        .setColor(0xeb459e)
      await interaction.reply({embeds: [embed], ephemeral: false });
    } else {
      let gifs = ['https://media.giphy.com/media/OYgElF5eLY4gGihQvu/giphy.gif','https://media.giphy.com/media/VW2eOurGyuV2mENqgP/giphy.gif','https://media.giphy.com/media/1xl9BVAMNlSMLCsyCP/giphy.gif','https://media.giphy.com/media/cJ5W8d9mJvrle6GzjO/giphy.gif','https://media.giphy.com/media/AN6xgHNXXwFxNifYJk/giphy.gif','https://media.giphy.com/media/26FLdmIp6wJr91JAI/giphy.gif',]
      let rand = Math.floor(Math.random() * gifs.length)
      let gif = gifs[rand]
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${interaction.member.id}> está cantando para ${usuario}`)
        .setImage(gif)
        .setColor(0xeb459e)
      await interaction.reply({embeds: [embed], ephemeral: false });
    }
  }
}