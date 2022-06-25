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
                label: '/staff borrar',
  						  value: 'staff_borrar',
              },{
                label: '/staff comandos deshabilitar',
  						  value: 'staff_comandos_deshabilitar',
              },{
                label: '/staff comandos habilitar',
  						  value: 'staff_comandos_habilitar',
              },{
                label: '/staff repite',
  						  value: 'staff_repite',
              },{
                label: '/staff servidor anunciar',
  						  value: 'staff_servidor_anunciar',
              },{
                label: '/staff servidor blacklist',
  						  value: 'staff_servidor_blacklist',
              },{
                label: '/staff servidor niveles',
  						  value: 'staff_servidor_niveles',
              },{
                label: '/staff servidor set-canal',
  						  value: 'staff_servidor_set-canal',
              },{
                label: '/staff servidor verify-activar',
  						  value: 'staff_servidor_verifyactivar',
              },{
                label: '/staff servidor verify-desactivar',
  						  value: 'staff_servidor_verifydesactivar',
              },{
                label: '/staff usuarios advertencias',
  						  value: 'staff_usuarios_advertencias',
              },{
                label: '/staff usuarios advertir',
  						  value: 'staff_usuarios_advertir',
              },{
                label: '/staff usuarios banear',
  						  value: 'staff_usuarios_banear',
              },{
                label: '/staff usuarios blacklist',
  						  value: 'staff_usuarios_blacklist',
              },{
                label: '/staff usuarios dinero',
  						  value: 'staff_usuarios_dinero',
              },{
                label: '/staff usuarios expulsar',
  						  value: 'staff_usuarios_expulsar',
              },{
                label: '/staff usuarios info',
  						  value: 'staff_usuarios_info',
              },{
                label: '/staff usuarios limpiar',
  						  value: 'staff_usuarios_limpiar',
              },{
                label: '/staff usuarios xp',
  						  value: 'staff_usuarios_xp',
              },{
                label: '/staff usuarios whitelist',
  						  value: 'staff_usuarios_whitelist',
              },
  					])
            .setDisabled(false),
  			);
      var embed = new Discord.MessageEmbed()
        .setDescription('**CUADRO DE AYUDA**\n\n**Comando `/staff servidor votar`**')
        .setColor(0xfee75c)
        .addField('¿Qué hace?', 'Crea una votación ordenada y preciosa para tu servidor.')
        .addField('Uso', '`/staff servidor votar <texto> <opción1> <opción2> [opción3]...[opción9]`')
        .addField('Permisos bot', 'Ver canales\nEnviar mensajes', true)
        .addField('Permisos usuario', 'Enviar mensajes\nGestionar mensajes\nUsar comandos de aplicaciones', true)
      await interaction.update({embeds: [embed], components:[lista], ephemeral: true})
    } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply") }
  }
}