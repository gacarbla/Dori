const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction)=>{
    var usuario = interaction.options.getUser('usuario');
    let gifs = [
      "https://c.tenor.com/O1-IX-P5ugQAAAAd/koi-to-uso-anime.gif",
      "https://c.tenor.com/0mdCwkmGD1oAAAAM/kiss-love.gif",
      "https://c.tenor.com/3zdH2jC6qCcAAAAM/love-anime.gif",
      "https://c.tenor.com/AtcFtesvEcEAAAAM/kissing-anime.gif",
      "https://c.tenor.com/7T1cuiOtJvQAAAAC/anime-kiss.gif",
      "https://c.tenor.com/Zwab7yjlNiEAAAAC/golden-time-anime.gif",
      "https://c.tenor.com/wr6fXkybDbkAAAAM/girl-anime.gif",
      "https://c.tenor.com/TWbZjCy8iN4AAAAC/girl-anime.gif",
      "https://c.tenor.com/CtpjMGItICQAAAAC/anime-kissing.gif",
      "https://c.tenor.com/ug8zygXFk3IAAAAM/kiss-anime-girl.gif",
      "https://c.tenor.com/UAWmqyne5Q4AAAAM/triste.gif",
      "https://c.tenor.com/16MBIsjDDYcAAAAM/love-cheek.gif",
      "https://c.tenor.com/uEIDcRqIxzMAAAAM/anime-kiss.gif",
      "https://c.tenor.com/v4Ur0OCvaXcAAAAM/koi-to-uso-kiss.gif",
      "https://c.tenor.com/WxITy4XYFVUAAAAC/kiss-yuri.gif",
      "https://c.tenor.com/89-jqF13u2oAAAAM/sakura-trick-kiss.gif",
      "https://c.tenor.com/eFOHgM3eYIYAAAAM/kon-yui.gif",
      "https://c.tenor.com/Vh1US11TF9sAAAAM/kiss-citrus.gif",
      "https://c.tenor.com/hXGYVAf56sAAAAAM/yuri-kiss.gif",
      "https://c.tenor.com/qZtGzrrmpYUAAAAM/manga-anime.gif",
      "https://c.tenor.com/CtpjMGItICQAAAAC/anime-kissing.gif",
      "https://c.tenor.com/ErAPuiWY46QAAAAM/kiss-anime.gif",
      "https://c.tenor.com/ug8zygXFk3IAAAAC/kiss-anime-girl.gif",
      "https://c.tenor.com/31yZsebAXl0AAAAd/sounan-de-suka-are-you-lost.gif",
      "https://c.tenor.com/Urs7AIiPR9cAAAAC/girl-kiss-anime.gif",
      "https://c.tenor.com/AWrCWzX5G38AAAAM/anime-sakura-trick.gif",
      "https://c.tenor.com/wDYWzpOTKgQAAAAM/anime-kiss.gif",
      "https://c.tenor.com/Ze6FyEgy4WAAAAAM/kiss-anime.gif",
      "https://c.tenor.com/HPWDBAuRpAoAAAAM/anime-couple-kiss-anime.gif",
      "https://c.tenor.com/03wlqWILqpEAAAAM/highschool-dxd-asia.gif",
      "https://c.tenor.com/C2T65ulJUQUAAAAM/future-diary-mirai-nikki.gif",
      "https://c.tenor.com/OtqMZ3PzANcAAAAM/anime-kiss-cute.gif",
      "https://c.tenor.com/IG3UdIr5CoIAAAAM/zero-two-anime.gif",
    ]
    let rand = Math.floor(Math.random() * gifs.length)
    let gif = gifs[rand]
    if(usuario.id==interaction.member.id) {
      await interaction.reply({content: "A ver... Está bien que te quieras. ¿Pero no crees que besarte en público es demasiado?", ephemeral: true }).catch(()=>{return})
    } else if (usuario.id=="851215512427823104") {
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${interaction.member.id}> le ha dado un beso a ${usuario}`)
        .setImage("https://c.tenor.com/nESVmsd8qTMAAAAd/tokusatsu-winspector.gif")
        .setColor(0xeb459e)
      await interaction.reply({embeds: [embed], ephemeral: false }).catch(()=>{return})
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${usuario.id}> se ha sonrojado   0///0`)
        .setImage("https://c.tenor.com/2gOwmh3T6EcAAAAM/anime-blush.gif")
        .setColor(0xeb459e)
      await interaction.followUp({embeds: [embed], ephemeral: false }).catch(()=>{return})
    } else if (usuario.bot) {
      await interaction.reply({content: "¿Acaso estamos ante un caso de bot-filia?", ephemeral: true }).catch(()=>{return})
    } else {
      var embed = new Discord.MessageEmbed()
        .setDescription(`<@!${interaction.member.id}> le ha dado un beso a ${usuario}`)
        .setImage(gif)
        .setColor(0xeb459e)
      await interaction.reply({embeds: [embed], ephemeral: false }).catch(()=>{return})
    }
  }
}