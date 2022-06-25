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
              label: '/gif abrazar',
						  value: 'gif_abrazar',
            },{
              label: '/gif aburrido',
						  value: 'gif_aburrido',
            },{
              label: '/gif bailar',
						  value: 'gif_bailar',
            },{
              label: '/gif besar',
						  value: 'gif_besar',
            },{
              label: '/gif bofetada',
						  value: 'gif_bofetada',
            },{
              label: '/gif cantar',
						  value: 'gif_cantar',
            },{
              label: '/gif comer',
						  value: 'gif_comer',
            },{
              label: '/gif dedito',
						  value: 'gif_dedito',
            },{
              label: '/gif disparar',
						  value: 'gif_disparar',
            },{
              label: '/gif dormir',
						  value: 'gif_dormir',
            },{
              label: '/gif enfadarse',
						  value: 'gif_enfadarse',
            },{
              label: '/gif feliz',
						  value: 'gif_feliz',
            },{
              label: '/gif hambre',
						  value: 'gif_hambre',
            },{
              label: '/gif miedo',
						  value: 'gif_miedo',
            },{
              label: '/gif patada',
						  value: 'gif_patada',
            },{
              label: '/gif pegar',
						  value: 'gif_pegar',
            },{
              label: '/gif pensar',
						  value: 'gif_pensar',
            },{
              label: '/gif saludar',
						  value: 'gif_saludar',
            },{
              label: '/gif sonrojado',
						  value: 'gif_sonrojado',
            },{
              label: '/gif sueño',
						  value: 'gif_sueño',
            },{
              label: '/gif triste',
						  value: 'gif_triste',
            },
					]),
			);
    var embed = new Discord.MessageEmbed()
      .setDescription('**CUADRO DE AYUDA**\n\n**Comando `/gif lamer`**')
      .setColor(0xfee75c)
      .addField('¿Qué hace?', 'Muestra un gif según el cuál lames al usuario que hayas mencionado')
      .addField('Uso', '`/gif lamer <usuario>`')
      .addField('Permisos bot', 'Ver canales\nEnviar mensajes\nInsertar enlaces', true)
      .addField('Permisos usuario', 'Enviar mensajes\nUsar comandos de aplicaciones', true)
    await interaction.update({embeds: [embed], components:[lista], ephemeral: true})
  }
}