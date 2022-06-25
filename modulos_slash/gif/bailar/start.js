const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction)=>{
    var usuario = interaction.options.getUser('usuario');
    if(!usuario){
      /* 12/12/2021 */
      let gifs = [
        'https://media.giphy.com/media/W6dHvprT7oks6BpX5R/giphy.gif',
        'https://media.giphy.com/media/HZboJ5Pkti9k4/giphy.gif',
        'https://media.giphy.com/media/11lxCeKo6cHkJy/giphy.gif',
        'https://media.giphy.com/media/FGPbhxVgMh3rO/giphy.gif',
        'https://media.giphy.com/media/LML5ldpTKLPelFtBfY/giphy.gif',
        'https://media.giphy.com/media/ss9NqmOeQxRKg/giphy.gif',
        'https://media.giphy.com/media/10YWqUivkQPeeJWD3u/giphy.gif',
        'https://media.giphy.com/media/2UvR8rSEowSM8/giphy.gif',
        'https://media.giphy.com/media/y5efFpqW5knlu/giphy.gif',
        'https://media.giphy.com/media/b7l5cvG94cqo8/giphy.gif',
      ]
      let rand = Math.floor(Math.random() * gifs.length)
      let gif = gifs[rand]
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${interaction.member.id}> está bailando`)
        .setImage(gif)
        .setFooter("*Puede contener gifs de carácter fotoepiléptico")
        .setColor(0xeb459e)
      await interaction.reply({embeds: [embed], ephemeral: false });
    } else {
      /* */
      let gifs = [
        'https://media.giphy.com/media/3o6oziEt5VUgsuunxS/giphy.gif',
        'https://media.giphy.com/media/pHYaWbspekVsTKRFQT/giphy.gif',
        'https://media.giphy.com/media/j3gsT2RsH9K0w/giphy.gif',
        'https://media.giphy.com/media/8j3CTd8YJtAv6/giphy.gif',
        'https://media.giphy.com/media/L253rIFQkyXSg/giphy.gif',
        "https://tenor.com/bhzAA.gif",
        "https://tenor.com/Rdi3.gif"
      ]
      let rand = Math.floor(Math.random() * gifs.length)
      let gif = gifs[rand]
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${interaction.member.id}> está bailando para ${usuario}`)
        .setImage(gif)
        .setColor(0xeb459e)
      await interaction.reply({embeds: [embed], ephemeral: false });
    }
  }
}