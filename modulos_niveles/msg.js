const Discord = require("discord.js")
const megadb = require("megadb")
const moment = require('moment')
const usuarios = new megadb.crearDB('usuarios')
const servidores = new megadb.crearDB('servidores')

module.exports = {
  
  run: async (client, message) => {
  
  // --- Creamos los elementos necesarios en las bases de datos que corresponden --- //
    try {
      try{if(!servidores.has(`${message.guild.id}.niveles.estado`)){servidores.establecer(`${message.guild.id}.niveles`,{estado: "off",max:0,min:0})}}catch(e){console.log(e)}
      try{
        var estado = await servidores.obtener(`${message.guild.id}.niveles.estado`)
        if (estado=="on"){
          try{if (!usuarios.has(`${message.member.id}.temporizadores.xp_${message.guild.id}`)){usuarios.establecer(`${message.member.id}.temporizadores.xp_${message.guild.id}`,0)}}catch(e){console.log(e)}
          try{if (!usuarios.has(`${message.member.id}.xp.${message.guild.id}.nivel`)){usuarios.establecer(`${message.member.id}.xp.${message.guild.id}`,{nivel:0,puntos:0})}}catch(e){console.log(e)}
        }
      }catch(e){console.log(e)}
    }catch(e){console.log(e)}
  // ------------------------------------------------------------------------------- //

  // --- Declaramos variables universales ------------------------------------------ //
    var n1=25;var n2=5;var aleatorio=Math.floor((Math.random()*20)+5)
  // ------------------------------------------------------------------------------- //

  // --- Calculamos lo que se debería sumar al usuario ----------------------------- //
    try {
      try{if (servidores.has(`${message.guild.id}.niveles.max`)){n1=await servidores.obtener(`${message.guild.id}.niveles.max`)}}catch(e){console.log(e)}
      try{if (servidores.has(`${message.guild.id}.niveles.min`)){n2=await servidores.obtener(`${message.guild.id}.niveles.min`)}}catch(e){console.log(e)}
      try{
        if (usuarios.has(`${message.member.id}.temporizadores.morexp_${message.guild.id}`)){
          var tempo=await usuarios.obtener(`${message.member.id}.temporizadores.morexp_${message.guild.id}`)
          if(tempo>Date.now()){n1=Math.floor(n1*2);n2=Math.floor(n2*2)}
        }
      }catch(e){console.log(e)}
      try{
        var rango=Math.floor(Math.max(n1,n2)-Math.min(n1,n2))
        var aleatoriedad=Math.floor(Math.random()*rango)
        aleatorio=Math.floor(aleatoriedad+Math.min(n1,n2))
      }catch(e){console.log(e)}
    }catch(e){console.log(e)}
  // ------------------------------------------------------------------------------- //
  
  // --- Sumamos los correspondientes puntos al usuario ---------------------------- //
    try{
      if (!usuarios.has(`${message.member.id}.temporizadores.xp_${message.guild.id}`)){
        usuarios.establecer(`${message.member.id}.temporizadores.xp_${message.guild.id}`, 0)
      }
      if(!usuarios.has(`${message.member.id}.xp.${message.guild.id}.puntos`)){usuarios.establecer(`${message.member.id}.xp.${message.guild.id}`,{puntos:0,nivel:0})}
      var temporizador = await usuarios.obtener(`${message.member.id}.temporizadores.xp_${message.guild.id}`);
      if (temporizador<Date.now()) {
        usuarios.sumar(`${message.member.id}.xp.${message.guild.id}.puntos`,aleatorio)
        usuarios.establecer(`${message.member.id}.temporizadores.xp_${message.guild.id}`, Math.floor(Date.now()+60000))
      }
    }catch(e){console.log(e)}
  // ------------------------------------------------------------------------------- //

  // --- Recalcular los niveles y asignárselos al usuario -------------------------- //
    try{
      // Obtiene los niveles del usuario
      var nivel = await usuarios.obtener(`${message.member.id}.xp.${message.guild.id}.nivel`)

      // Obtiene los puntos del usuario
      var puntos = await usuarios.obtener(`${message.member.id}.xp.${message.guild.id}.puntos`)
      
      // Recalcula el nivel si hay puntos y el nivel es "realista"
      if(nivel>=0){
        if(puntos>0){
          var i = 0
          var x = 0
          for (i=0;i>=0;i++){
            x = Math.floor((i+1)/3)
            x = Math.floor((5**x)+1)
            x = Math.floor(i+(50*x))
            if (puntos<x){
              break
            }
          }

          // Si el nivel ha cambiado envía una notificación personalizada
          if(i!==nivel){
            var title = "¡Tu nivel ha cambiado!"
            var desc = `En el servidor \`${message.guild.name}\` eres nivel \`${i}\``
            var description = `En este servidor ahora eres nivel \`${i}\`.\n¡Sigue así!`
            if(i<nivel){title = "Has bajado de nivel"}
            if(i>nivel){title = "Has subido de nivel"}
            var embed_priv = new Discord.MessageEmbed().setTitle(`${title}`).setDescription(`${desc}`).setColor(0x5865f2)
            var embed_serv = new Discord.MessageEmbed().setTitle(`${title}`).setDescription(`${description}`).setColor(0x5865f2)
            var obj = {title: title, description: desc}
            require("../modulos_notify/start").run(client, message, message.author.id, embed_priv, embed_serv, obj)
          }

          // Establece el nuevo nivel del usuario
          usuarios.establecer(`${message.member.id}.xp.${message.guild.id}.nivel`,i)
        } else {
          usuarios.establecer(`${message.member.id}.xp.${message.guild.id}.nivel`, 0)
        }
      }else{
        usuarios.establecer(`${message.member.id}.xp.${message.guild.id}.nivel`, 0)
      }
    }catch(e){console.log(e)}
  // ------------------------------------------------------------------------------- //

  },
  level: async (client, message) => {

  // --- Recalcular los niveles y asignárselos al usuario -------------------------- //
    try{
      // Obtiene los niveles del usuario
      var nivel = await usuarios.obtener(`${message.member.id}.xp.${message.guild.id}.nivel`)

      // Obtiene los puntos del usuario
      var puntos = await usuarios.obtener(`${message.member.id}.xp.${message.guild.id}.puntos`)
      
      // Recalcula el nivel si hay puntos y el nivel es "realista"
      if(nivel>=0){
        if(puntos>0){
          var i = 0
          var x = 0
          for (i=0;i>=0;i++){
            x = Math.floor((i+1)/3)
            x = Math.floor((5**x)+1)
            x = Math.floor(i+(50*x))
            if (puntos<x){
              break
            }
          }

          // Si el nivel ha cambiado envía una notificación personalizada
          if(i!==nivel){
            var title = "¡Tu nivel ha cambiado!"
            var desc = `En el servidor \`${message.guild.name}\` eres nivel \`${i}\``
            var description = `En este servidor ahora eres nivel \`${i}\`.\n¡Sigue así!`
            if(i<nivel){title = "Has bajado de nivel"}
            if(i>nivel){title = "Has subido de nivel"}
            var embed_priv = new Discord.MessageEmbed().setTitle(`${title}`).setDescription(`${desc}`).setColor(0x5865f2)
            var embed_serv = new Discord.MessageEmbed().setTitle(`${title}`).setDescription(`${description}`).setColor(0x5865f2)
            var obj = {title: title, description: desc}
            require("../modulos_notify/start").run(client, message, message.member.id, embed_priv, embed_serv, obj)
          }

          // Establece el nuevo nivel del usuario
          usuarios.establecer(`${message.member.id}.xp.${message.guild.id}.nivel`,i)
        } else {
          usuarios.establecer(`${message.member.id}.xp.${message.guild.id}.nivel`, 0)
        }
      }else{
        usuarios.establecer(`${message.member.id}.xp.${message.guild.id}.nivel`, 0)
      }
    }catch(e){console.log(e)}
  // ------------------------------------------------------------------------------- //

  }
}