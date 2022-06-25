const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    var max = Math.max(interaction.options.getInteger('mínimo'), interaction.options.getInteger('máximo'))
    var min = Math.min(interaction.options.getInteger('mínimo'), interaction.options.getInteger('máximo'))
    var rango = Math.floor(max-min)
    var aleatoriedad = Math.floor(Math.random()*`${rango}`)
    var aleatorio = Math.floor(aleatoriedad+min)
    var embed = new Discord.MessageEmbed()
      .setDescription(`🤔 Entre el \`${min}\` y el \`${max}\` he escogido el número \`${aleatorio}\``)
      .setColor(0x5865f2)
    await interaction.reply({embeds: [embed], ephemeral: false})
  }
}