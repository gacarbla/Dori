const Discord = require('discord.js')

module.exports = {
  run: async (client, interaction) => {
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
            label: '/miscelánico 8ball',
            value: 'miscelánico_ball',
          },{
            label: '/miscelánico aleatorio',
            value: 'miscelánico_aleatorio',
          },{
            label: '/miscelánico amor',
            value: 'miscelánico_amor',
          },{
            label: '/miscelánico anime',
            value: 'miscelánico_anime',
          },{
            label: '/miscelánico color hex',
            value: 'miscelánico_colorhex',
          },{
            label: '/miscelánico color rgb',
            value: 'miscelánico_colorrgb',
          },{
            label: '/miscelánico escoge',
            value: 'miscelánico_escoge',
          },{
            label: '/miscelánico minecraft-servidor',
            value: 'miscelánico_minecraftservidor',
          },{
            label: '/miscelánico minecraft-skin',
            value: 'miscelánico_minecraftskin',
          },{
            label: '/miscelánico roblox-avatar',
            value: 'miscelánico_robloxavatar',
          }
        ]),
    );
    var titulo = "**CUADRO DE AYUDA**"
    let texto = [
      "\`/miscelánico 8ball\` **::** 8ball",
      "\`/miscelánico aleatorio\` **::** Número aleatorio",
      "\`/miscelánico amor\` **::** Shipeo usuarios",
      "\`/miscelánico anime\` **::** Buscar anime",
      "\`/miscelánico color hex\` **::** Obtén un color",
      "\`/miscelánico color rgb\` **::** Obtén un color",
      "\`/miscelánico escoge\` **::** Escoger entre opciones",
      "\`/miscelánico minecraft-servidor\` **::** Servidor de Minecraft",
      "\`/miscelánico minecraft-skin\` **::** Skin de Minecraft",
      "\`/miscelánico roblox-avatar\` **::** Avatar de Roblox",
    ]
    texto = texto.sort()
    var embed = new Discord.MessageEmbed()
      .setDescription(`${titulo}\n**Categoría \`/miscelánico\`**\n\n`+texto.join("\n"))
      .setFooter(`${texto.length} comandos`)
      .setColor(0xfee75c)
    await interaction.update({embeds: [embed], components:[lista], ephemeral: true})
  }
}