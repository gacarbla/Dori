const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    var opt1 = interaction.options.getString('opción1')
    var opt2 = interaction.options.getString('opción2')
    var opt3 = interaction.options.getString('opción3')
    var opt4 = interaction.options.getString('opción4')
    var opt5 = interaction.options.getString('opción5')
    var opt6 = interaction.options.getString('opción6')
    var opt7 = interaction.options.getString('opción7')
    let options = [`${opt1}`, `${opt2}`, `${opt3}`, `${opt4}`, `${opt5}`, `${opt6}`, `${opt7}`,]
    var random = Math.floor(Math.random()*options.filter(opt=> opt.length<1).length)
    var embed = new Discord.MessageEmbed()
      .setDescription(`🤔 Entre todas las opciones que me has dado a escoger, he escogido \`${options[random]}\``)
      .setColor(0x5865f2)
    await interaction.reply({embeds: [embed], ephemeral: false})
  }
}