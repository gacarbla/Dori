const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction)=>{
  var usuario = interaction.options.getUser('usuario');
  let gifs = ['https://media.giphy.com/media/VgfUiixoYIbC2yLKfX/giphy.gif','https://media.giphy.com/media/37q65wDR8r23bksKEB/giphy.gif','https://media.giphy.com/media/l2SqfNigBRJ3REFRm/giphy.gif','https://media.giphy.com/media/YkK75m6wnjsag0d1NV/giphy.gif']
  let rand = Math.floor(Math.random() * gifs.length)
  let gif = gifs[rand]
  var embed = new Discord.MessageEmbed()
    .setDescription(`<@!${interaction.member.id}> le ha dado una bofetada a ${usuario}`)
    .setImage(gif)
    .setColor(0xeb459e)
  await interaction.reply({embeds: [embed], ephemeral: false });
  }
}