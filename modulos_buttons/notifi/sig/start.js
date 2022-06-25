const Discord = require('discord.js')
const megadb = require("megadb")
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    try {
      usuarios.establecer(`${interaction.member.id}.ajustes-notificaciones.informado.boolean`, true)
      if (!usuarios.has(`${interaction.member.id}.ajustes-notificaciones.medio`)){usuarios.establecer(`${interaction.member.id}.ajustes-notificaciones`, {medio: "S",timestamp: Date.now()})}
      var id = interaction.member.id
      var notificaciones = await usuarios.keys(`${id}.notificaciones`)
      if(!notificaciones || notificaciones.length == 0) {
        var embed = new Discord.MessageEmbed()
          .setDescription("No tienes notificaciones sin leer")
          .setColor(0x5865f2)
        await interaction.reply({embeds:[embed], ephemeral: true})
      } else {
        const boton = new Discord.MessageActionRow()
        .addComponents(
  		    new Discord.MessageButton()
  					.setCustomId('notifi_sig')
  					.setLabel('Siguiente')
            .setDisabled(notificaciones.length<2)
  					.setStyle('SECONDARY'),
  		  )
        notificaciones = notificaciones.sort()
        var titulo;var descripción;var image
        if(usuarios.has(`${id}.notificaciones.${notificaciones[0]}.titulo`)){titulo = await usuarios.obtener(`${id}.notificaciones.${notificaciones[0]}.titulo`)}
        if(usuarios.has(`${id}.notificaciones.${notificaciones[0]}.descripcion`)){var descripción = await usuarios.obtener(`${id}.notificaciones.${notificaciones[0]}.descripcion`)}
        if(usuarios.has(`${id}.notificaciones.${notificaciones[0]}.imagen`)){image = await usuarios.obtener(`${id}.notificaciones.${notificaciones[0]}.imagen`)}
        var embed = new Discord.MessageEmbed()
          .setAuthor("NOTIFICACIONES")
          .setTitle(`${titulo?titulo:"Error cargando el título de la notificación"}`)
          .setDescription(`${descripción?descripción:"Error cargando la descripción de la notificación"}`)
          .setThumbnail(`${image?image:""}`)
          .setColor(0x5865f2)
        if (usuarios.has(`${id}.notificaciones.${notificaciones[0]}.servidor`)){embed = embed.addField(`Servidor:`, `${client.guilds.resolve(await usuarios.obtener(`${id}.notificaciones.${notificaciones[0]}.servidor`)).name}`, true)}
        embed = embed.addField(`Fecha:`, `<t:${Math.floor(notificaciones[0]/1000)}:R>`, true)
        await interaction.update({embeds:[embed], ephemeral: true, components: [boton]})
        usuarios.eliminar(`${id}.notificaciones.${notificaciones[0]}`)
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}