const Discord = require("discord.js")
const megadb = require("megadb")
const moment = require('moment')
const usuarios = new megadb.crearDB('usuarios')
const servidores = new megadb.crearDB('servidores')

module.exports = {
  
  run: async (client, interaction, usuario_id, embed_privado, embed_servidor, obj_notify, canal_id) => {
    if (!usuarios.has(`${usuario_id}.ajustes-notificaciones.medio`)){usuarios.establecer(`${usuario_id}.ajustes-notificaciones`, {medio: "S",timestamp: Date.now()})}
    var tipo = await usuarios.obtener(`${usuario_id}.ajustes-notificaciones.medio`)
      
    // Si el usuario ha declarado que quiere ser notificado por el servidor en el que se encuentre en ese momento
    if (tipo == "S") {
      // embed_servidor
      if (!servidores.has(`${interaction.guild.id}.canales.no_notify`)) {
        servidores.establecer(`${interaction.guild.id}.canales.no_notify`, [])
      }
      var canales = await servidores.obtener(`${interaction.guild.id}.canales.no_notify`)

      // Si el servidor cuenta con un canal propio de notificaciones
      if (servidores.has(`${interaction.guild.id}.canales.notificaciones`)) {
        var canal = await servidores.obtener(`${interaction.guild.id}.canales.notificaciones`)
        client.channels.resolve(`${canal.id}`).send({embeds:[embed_servidor]}).catch(()=>{

          // Si no está permitido enviar mensajes en el canal
          if (!canal_id || canales.includes(canal_id)){
            client.users.resolve(`${usuario_id}`).send({embeds:[embed_privado]}).catch(()=>{
              usuarios.establecer(`${usuario_id}.notificaciones.${Date.now()}`, {titulo: obj_notify.title, descripcion: obj_notify.description})
            })

          // De lo contrario...
          } else {
            client.channels.resolve(`${canal_id}`).send({content: `<@!${usuario_id}>`,embeds: [embed_servidor]}).catch((e)=>{console.log(e)})
          }
        })
              
      // De lo contrario...
      } else {

        // Si no está permitido enviar mensajes en el canal
        if (!canal_id || canales.includes(canal_id)){
          client.users.resolve(`${usuario_id}`).send({embeds:[embed_privado]}).catch(()=>{
            usuarios.establecer(`${usuario_id}.notificaciones.${Date.now()}`, {titulo: obj_notify.title, descripcion: obj_notify.description})
          })

        // De lo contrario...
        } else {
          client.channels.resolve(`${canal_id}`).send({content: `<@!${usuario_id}>`,embeds: [embed_servidor]}).catch((e)=>{console.log(e)})
        } 
      }

    // Si el usuario ha declaradio que quiere ser notificado por privado
    } else if (tipo == "P") {
      client.users.resolve(`${usuario_id}`).send({embeds:[embed_privado]}).catch(()=>{
        usuarios.establecer(`${usuario_id}.notificaciones.${Date.now()}`, {titulo: obj_notify.title, descripcion: obj_notify.description})
      })

    // Si el usuario ha declarado que quiere ser notificado por el menú de notificaciones
    } else if (tipo == "N") {
      usuarios.establecer(`${usuario_id}.notificaciones.${Date.now()}`, {titulo: obj_notify.title, descripcion: obj_notify.description})
    }

    var notificaciones = await usuarios.keys(`${usuario_id}.notificaciones`)
    if (notificaciones.length>0){
      if(!usuarios.has(`${usuario_id}.ajustes-notificaciones.informado`)){usuarios.establecer(`${usuario_id}.ajustes-notificaciones.informado`, {timestamp: 0, boolean: false})}
      var informado = await usuarios.obtener(`${usuario_id}.ajustes-notificaciones.informado.boolean`)
      var timestamp = await usuarios.obtener(`${usuario_id}.ajustes-notificaciones.informado.timestamp`)
      if (informado && usuarios.has(`${usuario_id}.ajustes-notificaciones.informado.msgId`)) {
        usuarios.establecer(`${usuario_id}.ajustes-notificaciones.informado.boolean`, true)
        usuarios.establecer(`${usuario_id}.ajustes-notificaciones.informado.timestamp`, Math.floor(Date.now()+86400000))
        
        const boton = new Discord.MessageActionRow()
          .addComponents(
  		      new Discord.MessageButton()
  					  .setCustomId('notifi_bloq_1')
  					  .setLabel('Silenciar por hoy')
              .setDisabled(true)
  					  .setStyle('SECONDARY'),
            new Discord.MessageButton()
    					.setCustomId('notifi_bloq_7')
   		  			.setLabel('Silenciar por 7 días')
              .setDisabled(true)
  	  				.setStyle('SECONDARY'),
            new Discord.MessageButton()
  				  	.setCustomId('notifi_bloq_30')
  					  .setLabel('Silenciar por 30 días')
              .setDisabled(true)
  					  .setStyle('SECONDARY'),
            new Discord.MessageButton()
  		  			.setCustomId('notifi_bloq_0')
  			  		.setLabel('No volver a notificarme')
              .setDisabled(true)
  				  	.setStyle('DANGER'),
  		    )
        var embed = new Discord.MessageEmbed()
          .setDescription(`¡Tienes ${notificaciones.length} ${notificaciones.length>1?"notificaciones":"notificación"} sin leer!\nUsa el comando \`/usuario notificaciones ver\` para leer las notificaciones.`)
          .setColor(0x5865f2)
        client.channels.resolve(`${await usuarios.obtener(`${usuario_id}.ajustes-notificaciones.informado.msgCh`)}`).messages.edit(`${await usuarios.obtener(`${usuario_id}.ajustes-notificaciones.informado.msgId`)}`, {embeds:[embed], components: [boton]}).catch((e)=>{console.log(e)})
      } else if(!informado || timestamp<Date.now()){
        usuarios.establecer(`${usuario_id}.ajustes-notificaciones.informado.boolean`, true)
        usuarios.establecer(`${usuario_id}.ajustes-notificaciones.informado.timestamp`, Math.floor(Date.now()+86400000))
        
        const boton = new Discord.MessageActionRow()
          .addComponents(
  		      new Discord.MessageButton()
  					  .setCustomId('notifi_bloq_1')
  					  .setLabel('Silenciar por hoy')
              .setDisabled(true)
  					  .setStyle('SECONDARY'),
            new Discord.MessageButton()
    					.setCustomId('notifi_bloq_7')
   		  			.setLabel('Silenciar por 7 días')
              .setDisabled(true)
  	  				.setStyle('SECONDARY'),
            new Discord.MessageButton()
  				  	.setCustomId('notifi_bloq_30')
  					  .setLabel('Silenciar por 30 días')
              .setDisabled(true)
  					  .setStyle('SECONDARY'),
            new Discord.MessageButton()
  		  			.setCustomId('notifi_bloq_0')
  			  		.setLabel('No volver a notificarme')
              .setDisabled(true)
  				  	.setStyle('DANGER'),
  		    )
        
        var embed = new Discord.MessageEmbed()
          .setDescription(`¡Tienes ${notificaciones.length} ${notificaciones.length>1?"notificaciones":"notificación"} sin leer!\nUsa el comando \`/usuario notificaciones ver\` para leer las notificaciones.`)
          .setColor(0x5865f2)
        client.users.resolve(`${usuario_id}`).send({embeds:[embed], components: [boton]}).then((m)=>{
          usuarios.establecer(`${usuario_id}.ajustes-notificaciones.informado.msgId`, m.id)
          usuarios.establecer(`${usuario_id}.ajustes-notificaciones.informado.msgCh`, m.channel.id)
        }).catch((e)=>{console.log(e)})
      }
    }
  }
}