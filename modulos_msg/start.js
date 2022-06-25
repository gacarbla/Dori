const Discord = require("discord.js")
const megadb = require("megadb")
const moment = require('moment')
const usuarios = new megadb.crearDB('usuarios')
const servidores = new megadb.crearDB('servidores')

module.exports = {
  run: async (client, message) => {
    
    try {
      require("../comandos").run(client, message)
    } catch { return }

    try {
      if(servidores.has(`${message.guild.id}.verify.rol`)){
        var rol = await servidores.obtener(`${message.guild.id}.verify.rol`)
        var perm = message.member.roles.cache.has(rol) || message.member.permissions.has("ADMINISTRATOR") || message.member.permissions.has("MANAGE_MESSAGES") || message.author.bot
        if (!perm && message.channel.id!==message.guild.systemChannelId) {
          var embed = new Discord.MessageEmbed()
            .setDescription("No tienes el rol de verificad@ para enviar mensajes en este servidor.\nUtiliza el comando slash `/verificar` para poder enviar mensajes en este servidor.")
            .setColor(0xed4245)
            .setFooter('Este mensaje se auto-destruirá en 10 segundos')
          message.channel.send({embeds: [embed], reply: { messageReference: message.id }}).then(m=>{
            try {
              try {
                message.delete()
              } catch { return }
              try {
                setTimeout(() => m.delete(), 10000)
              } catch { return }
            } catch { return }
          })
        }
        if ( message.member.roles.cache.has(rol) ) {
          usuarios.eliminar(`${message.member.id}.verify.${message.guild.id}`)
        }
      }
    } catch (e) { return }

    /* MONEDAS - ECONOMÍA - CURRENCY */
    try {
      if(servidores.has(`${message.guild.id}.modulos.econ`)){ return }
      else {
        if(usuarios.has(`${message.member.id}.dinero.${message.guild.id}.cartera`) && usuarios.has(`${message.member.id}.dinero.${message.guild.id}.banco`)){
          try {
            var temporizador = await usuarios.obtener(`${message.member.id}.temporizadores.dinero_${message.guild.id}`);
            if(temporizador<Date.now()){
              let cantidad = 1
              try {
                if(usuarios.has(`${message.member.id}.items.${message.guild.id}.amuleto`)){ cantidad = Math.floor(Math.random()*5) }
                try{
                  usuarios.sumar(`${message.member.id}.dinero.${message.guild.id}.cartera`, `${cantidad}`);
                  usuarios.establecer(`${message.member.id}.temporizadores.dinero_${message.guild.id}`, Math.floor(Date.now()+60000))
                } catch { return }
              } catch { return }
            }
          } catch { return }
        } else {
          try{
            usuarios.establecer(`${message.member.id}.dinero.${message.guild.id}.cartera`, 1)
            usuarios.establecer(`${message.member.id}.dinero.${message.guild.id}.banco`, 1000)
            usuarios.establecer(`${message.member.id}.temporizadores.dinero_${message.guild.id}`, Math.floor(Date.now()+60000))
          } catch { return }
        }
      }
      if(!usuarios.has(`${message.member.id}.reputacion.${message.guild.id}`)){
        try{ usuarios.establecer(`${message.member.id}.reputacion.${message.guild.id}`, 70) } catch { return }
      } else {
        var random = Math.floor(Math.random()*100)
        if(random<3){ usuarios.sumar(`${message.member.id}.reputacion.${message.guild.id}`, random) }
      }
    } catch { return }
      
    /* XP - NIVELES */

    try {
      if(servidores.has(`${message.guild.id}.niveles.estado`)){
        var estado = await servidores.obtener(`${message.guild.id}.niveles.estado`)
        if (estado=="on"){
          require("../modulos_niveles/msg").run(client, message)
        }
      }
    } catch (e) { console.log(e) }
      
      
    /* SERVIDORES - REGISTRO - HISTORIAL */
    try {  
      if(!servidores.has(`${message.guild.id}`)){
        try {
          servidores.establecer(`${message.guild.id}.datos`, {nombre: `${message.guild.name}`, owner: `${message.guild.ownerId}`})
          servidores.establecer(`${message.guild.id}.mensajes.hoy`, { día: moment(Date.now()).format('L') , numero: 1})
        } catch {return}
      } else {
        try {
          servidores.establecer(`${message.guild.id}.datos`, {nombre: `${message.guild.name}`, owner: `${message.guild.ownerId}`})
          var fecha_mensajes = await servidores.obtener(`${message.guild.id}.mensajes.hoy.día`)
          if(fecha_mensajes === moment(Date.now()).format('L')) { try { servidores.sumar(`${message.guild.id}.mensajes.hoy.numero`, 1) } catch {return} }
          else {
            try {
              servidores.eliminar(`${message.guild.id}.mensajes.hoy.día`)
              servidores.establecer(`${message.guild.id}.mensajes.hoy`, { día: moment(Date.now()).format('L') , numero: 1})
            } catch { return }
          }
        } catch { return }
      }
    } catch { return }
    try {
      try { usuarios.ordenar(`${message.author.id}.temporizadores`, `${message.author.id}.temporizadores`).catch(()=>{return}) } catch { return }
    } catch { return }
  }
}