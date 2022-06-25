const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
    try {
      const lista = new Discord.MessageActionRow()
  			.addComponents(
  				new Discord.MessageSelectMenu()
  					.setCustomId('ayudalist')
  					.setPlaceholder('Comando')
  					.addOptions([
              {
                label: 'Volver',
                description: 'Volver al menú principal',
  						  value: 'volver',
                emoji: {
                  id: "892449750538924032",
                  name: "atras"
                }
              },{
                label: '/xp ver',
                value: 'xp_ver',
              },{
                label: '/xp ranking',
                value: 'xp_ranking',
              },{
                label: '/xp reiniciar',
                value: 'xp_reiniciar',
              },
  					]),
  			);
        var titulo = "**CUADRO DE AYUDA**"
        let texto = [
          "\`/xp ver\` **::** Obtén tus niveles",
          "\`/xp ranking\` **::** Obtén el ranking",
          "\`/xp reiniciar\` **::** Reinicia tus niveles",
        ]
        texto = texto.sort()
        var embed = new Discord.MessageEmbed()
          .setDescription(`${titulo}\n**Categoría \`/xp\`**\n\n${texto.join("\n")}`)
          .setFooter(`${texto.length} comandos`)
          .setColor(0xfee75c)
      await interaction.update({embeds: [embed], components:[lista], ephemeral: true})
    } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply") }
  }
}