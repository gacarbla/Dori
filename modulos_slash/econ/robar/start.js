const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')

module.exports = {
  run: async (client, interaction) => {
    var usuario = interaction.options.getMember('usuario')
    if(!usuarios.has(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`)) {
      usuarios.establecer(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`, 0)
    }
    var carcel = await usuarios.obtener(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`)
    if(carcel<Date.now()){
      if(usuario.id===interaction.member.id){
        usuarios.restar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 1)
        var embed = new Discord.MessageEmbed()
          .setDescription('¿Tu eres tont@ o masticas agua?\n¿Porqué te robas a ti mism@?')
          .setColor(0x5865f2)
        await interaction.reply({embeds: [embed], ephemeral: true})
      } else {
        if(!usuarios.has(`${usuario.id}.dinero.${interaction.guild.id}`)){
          var embed = new Discord.MessageEmbed()
            .setDescription('**ERROR 74**\nEste usuario no está registrado')
            .setFooter('Para ver la definición concreta del error, use el comando /error')
            .setColor(0xed4245)
          await interaction.reply({embeds: [embed], ephemeral: true})
        } else {
          var dinero_asaltado = await usuarios.obtener(`${usuario.id}.dinero.${interaction.guild.id}.cartera`)
          if(dinero_asaltado<1){
            var embed = new Discord.MessageEmbed()
              .setDescription('¿Tu eres tont@ o masticas agua?\nHas intentado robarle a alguien que no tiene dinero')
              .setColor(0x5865f2)
            await interaction.reply({embeds: [embed], ephemeral: true})
          } else {
            let police = Math.floor(Math.random()*8)
            let protegido = "no"
            if (usuarios.has(`${usuario.id}.temporizadores.guardaespaldas_${interaction.guild.id}`)) {
              var validez = await usuarios.has(`${usuario.id}.temporizadores.guardaespaldas_${interaction.guild.id}`)
              if (validez>Date.now()){
                protegido=="si"
              }
            }
            if (protegido=="si") {
              usuarios.restar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 20)
              let condena = Math.floor(Math.random()*7)
              let multa = Math.floor(Math.random()*18)
              usuarios.establecer(`${interaction.member.id}.temporizadores.${interaction.guild.id}.carcel_${interaction.guild.id}`, Math.floor(Date.now()+(condena*86400000)))
              usuarios.restar(`${interaction.member.id}.dinero.${interaction.guild.id}.banco`, Math.floor(multa*15))
              var embed = new Discord.MessageEmbed()
                .setDescription("Hemos tenido un pequeeeeeño problema...\nEsta persona resulta tener guardaespaldas.")
                .setColor(0xed4245)
              await interaction.reply({embeds: [embed], ephemeral: true})
              var embed = new Discord.MessageEmbed()
                .setAuthor('Policía', 'https://th.bing.com/th/id/OIP.Ng1DMmORJjs1k7X6U8B6DwAAAA?pid=ImgDet&rs=1')
                .setDescription('Hemos pillado a este crimal intentando robar.')
                .addField('Criminal:', `<@!${interaction.member.id}>`)
                .addField('Condena:', `${condena} días de prisión`)
                .addField('Multa:', `${Math.floor(multa*10)} ₪`)
                .setColor(0x5865f2)
              interaction.channel.send({embeds: [embed]})
            } else if(police<2){
              if(usuarios.has(`${interaction.member.id}.items.${interaction.guild.id}.soborno`)) {
                usuarios.restar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 25)
                usuarios.restar(`${interaction.member.id}.items.${interaction.guild.id}.soborno`, 1)
                var embed = new Discord.MessageEmbed()
                  .setDescription('Ufff\nTe habían pillado, menos mal que tenías un soborno encima.')
                  .setColor(0x5865f2)
                await interaction.reply({embeds: [embed], ephemeral: true})
                var cantidad = await usuarios.obtener(`${interaction.member.id}.items.${interaction.guild.id}.soborno`)
                if(cantidad===0){
                  usuarios.eliminar(`${interaction.member.id}.items.${interaction.guild.id}.soborno`)
                }
              } else {
                usuarios.restar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 20)
                let condena = Math.floor(Math.random()*7)
                let multa = Math.floor(Math.random()*10)
                usuarios.establecer(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`, Math.floor(Date.now()+(condena*86400000)))
                usuarios.restar(`${interaction.member.id}.dinero.${interaction.guild.id}.banco`, Math.floor(multa*10))
                var embed = new Discord.MessageEmbed()
                  .setDescription('¡Oh no! Nos han pillado')
                  .setColor(0x5865f2)
                await interaction.reply({embeds: [embed], ephemeral: true})
                var embed = new Discord.MessageEmbed()
                  .setAuthor('Policía', 'https://th.bing.com/th/id/OIP.Ng1DMmORJjs1k7X6U8B6DwAAAA?pid=ImgDet&rs=1')
                  .setDescription('Hemos pillado a este crimal intentando robar.')
                  .addField('Criminal:', `<@!${interaction.member.id}>`)
                  .addField('Condena:', `${condena} días de prisión`)
                  .addField('Multa:', `${Math.floor(multa*10)} ₪`)
                  .setColor(0x5865f2)
                interaction.channel.send({embeds: [embed]})
              }
            } else {
              let identificado = Math.floor(Math.random()*20)
              let robado = Math.floor(Math.random()*(dinero_asaltado))
              usuarios.restar(`${usuario.id}.dinero.${interaction.guild.id}.cartera`, Math.floor(robado+1))
              usuarios.restar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 8)
              usuarios.sumar(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`, Math.floor(robado+1))
              if(identificado<4){
                await interaction.reply({content: `¡NINJA!`, ephemeral: true})
                var embed = new Discord.MessageEmbed()
                  .setDescription(`Alguien te ha robado ${Math.floor(robado+1)} ₪ \nLa policía no ha sido capaz a indentificarle.`)
                  .setColor(0xed4245)
                interaction.channel.send({content: `<@!${usuario.id}>`,embeds: [embed]}).catch(()=>{return})
              } else {
                await interaction.reply({content: `Nos han visto  :c`, ephemeral: true})
                var embed = new Discord.MessageEmbed()
                  .setDescription(`Alguien te ha robado ${Math.floor(robado+1)} ₪ \nLa policía le ha identificado como <@!${interaction.member.id}> (${interaction.user.username}#${interaction.user.discriminator})`)
                  .setColor(0xed4245)
                interaction.channel.send({content: `<@!${usuario.id}>`,embeds: [embed]}).catch(()=>{return})
              }
            }
          }
        }
      }
    } else {
      usuarios.restar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 0.5)
      var ms_restante = Math.floor(carcel-Date.now())
      var días_restante = Math.floor(ms_restante/86400000)
      var horas_restante = Math.floor((ms_restante%86400000)/3600000)
      var minutos_restante = Math.floor(((ms_restante/1000)/60)%60)
      var segundos_restante = Math.floor((ms_restante/1000)%60)
      var embed = new Discord.MessageEmbed()
        .setDescription('No puedes robar, aún estás en la cárcel')
        .setFooter('Tiempo restante: '+días_restante+' días '+horas_restante+' horas '+minutos_restante+' minutos '+segundos_restante+' segundos')
        .setColor(0xed4245)
      await interaction.reply({embeds: [embed], ephemeral: true})
    }
  }
}