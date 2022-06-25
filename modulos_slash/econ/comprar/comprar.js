const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    try {
      usuarios.sumar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 0.2)
      let productos = []
      if(usuarios.has(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)){
        var dinero = await usuarios.obtener(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`)
        if (dinero>9){
          productos.push({label: "Galleta", description: "10 ₪", value: "galleta"})
        }
      }
      var lista = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageSelectMenu()
            .setCustomId('econ_comprar')
            .setPlaceholder('Seleccione un producto')
            .setDisabled(false)
            .addOptions(productos),
        )
      if (productos.length==0){
        lista = new Discord.MessageActionRow()
          .addComponents(
            new Discord.MessageSelectMenu()
              .setCustomId('econ_comprar')
              .setPlaceholder('No tienes suficiente dinero')
              .setDisabled(true)
              .addOptions(
                [
                  {
                    label: "0",
                    value: "0"
                  }
                ]
              ),
          )
      }
      const boton = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('econ_404_1')
            .setLabel('<<')
            .setDisabled(true)
            .setStyle('SECONDARY'),
          new Discord.MessageButton()
            .setCustomId('econ_404_2')
            .setLabel('<')
            .setDisabled(true)
            .setStyle('PRIMARY'),
          new Discord.MessageButton()
            .setCustomId('econ_ayuda')
            .setLabel('Ayuda')
            .setDisabled(false)
            .setStyle('SUCCESS'),
          new Discord.MessageButton()
            .setCustomId('econ_economia')
            .setLabel('>')
            .setDisabled(false)
            .setStyle('PRIMARY'),
          new Discord.MessageButton()
            .setCustomId('econ_otros')
            .setLabel('>>')
            .setDisabled(false)
            .setStyle('SECONDARY'),
        )
      var embed = new Discord.MessageEmbed()
        .setTitle(`LA TIENDA DE ${client.user.username.toUpperCase()} - ALIMENTACIÓN`)
        .setThumbnail("https://static.wikia.nocookie.net/minecraft_gamepedia/images/b/b3/Cookie_JE2_BE2.png/revision/latest?cb=20190505051355")
        .addField(`Galleta ( 10 $ )`, "Producto alimenticio simple y barato, que todo el mundo ama y puede traer sorpresa :wink:")
        .setFooter("1/5")
        .setColor(0x5865f2)
      await interaction.reply({embeds: [embed], ephemeral: true, components: [lista, boton]})
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}