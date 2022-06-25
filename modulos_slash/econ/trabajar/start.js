const Discord = require('discord.js')
const megadb = require('megadb')
const usuarios = new megadb.crearDB('usuarios')
const empleos = new megadb.crearDB('empleos')

module.exports = {
  run: async (client, interaction) => {
    try {
      if(!usuarios.has(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`)) {
        usuarios.establecer(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`, 0)
      }
      var carcel = await usuarios.obtener(`${interaction.member.id}.temporizadores.carcel_${interaction.guild.id}`)
      if(carcel<Date.now()){
        if(!usuarios.has(`${interaction.member.id}.trabajo.${interaction.guild.id}`)){
          var embed = new Discord.MessageEmbed()
            .setDescription(`Parece ser que no estás desemplad@.\nTus beneficios hoy han sido \`0 ₪\``)
            .setColor(0xed4245)
          await interaction.reply({embeds: [embed], ephemeral: true})
        } else {
          usuarios.sumar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 0.1)
          var temporizador = await usuarios.obtener(`${interaction.member.id}.temporizadores.${interaction.guild.id}_trabajo`)
          var temporizador_baja = await usuarios.obtener(`${interaction.member.id}.temporizadores.${interaction.guild.id}_baja`)
          if(temporizador && Date.now()<temporizador){
            var ms_restante = Math.floor(temporizador-Date.now())
            var horas_restante = Math.floor((ms_restante%86400000)/3600000)
            var minutos_restante = Math.floor(((ms_restante/1000)/60)%60)
            var segundos_restante = Math.floor((ms_restante/1000)%60)
            var embed = new Discord.MessageEmbed()
              .setDescription(`¡Ya has trabajado suficiente por hoy!\nVuelve en **${horas_restante}** horas, **${minutos_restante}** minutos y **${segundos_restante}** segundos`)
              .setColor(0xed4245)
            await interaction.reply({embeds: [embed], ephemeral: true})
          } else if(temporizador_baja && Date.now()<temporizador_baja){
            var ms_restante = Math.floor(temporizador_baja-Date.now())
            var horas_restante = Math.floor((ms_restante%86400000)/3600000)
            var minutos_restante = Math.floor(((ms_restante/1000)/60)%60)
            var segundos_restante = Math.floor((ms_restante/1000)%60)
            var embed = new Discord.MessageEmbed()
              .setDescription(`¡Estás de baja laboral!\nVuelve en **${horas_restante}** horas, **${minutos_restante}** minutos y **${segundos_restante}** segundos`)
              .setColor(0xed4245)
            await interaction.reply({embeds: [embed], ephemeral: true})
          } else {
            usuarios.sumar(`${interaction.member.id}.reputacion.${interaction.guild.id}`, 0.4)
            var empleo = await usuarios.obtener(`${interaction.member.id}.trabajo.${interaction.guild.id}`)
            var sueldo = await empleos.obtener(`${empleo}.sueldo`)
            let cliente = ""
            if(empleos.has(`${empleo}.cliente`)){
              cliente = await empleos.obtener(`${empleo}.cliente`)
            }
            var propina = await empleos.obtener(`${empleo}.propina`)
            var p_desastre = await empleos.obtener(`${empleo}.desastre.probabilidad`)
            var pmax_desastre = await empleos.obtener(`${empleo}.desastre.perdida_max`)
            var pmin_desastre = await empleos.obtener(`${empleo}.desastre.perdida_min`)
            var p_despido = await empleos.obtener(`${empleo}.desastre.despido`)
            var p_quiebra = await empleos.obtener(`${empleo}.desastre.quiebra`)
            var p_accidente = await empleos.obtener(`${empleo}.desastre.accidente`)
            var bmax_accidente = await empleos.obtener(`${empleo}.desastre.baja_max`)
            var bmin_accidente = await empleos.obtener(`${empleo}.desastre.baja_min`)
            var p_invalidez = await empleos.obtener(`${empleo}.desastre.invalidez`)
            var r_propina = Math.floor(Math.random()*100)
            var r_invalidez = Math.floor(Math.random()*100)
            var r_accidente = Math.floor(Math.random()*100)
            var r_desastre = Math.floor(Math.random()*100)
            var r_baja = Math.floor((Math.random()*(bmax_accidente-bmin_accidente))+bmin_accidente)
            var r_p_desastre = Math.floor((Math.random()*(pmax_desastre-pmin_desastre))+pmin_desastre)
            var r_despido = Math.floor(Math.random()*100)
            var r_quiebra = Math.floor(Math.random()*100)
            try{  
              if(r_quiebra<p_quiebra){
                usuarios.eliminar(`${interaction.member.id}.trabajo.${interaction.guild.id}`)
                var embed = new Discord.MessageEmbed()
                  .setDescription('Esto nadie se lo esperaba...\nLa empresa para la que trabajabas ha cerrado   :grimacing:')
                  .setColor(0xed4245)
                await interaction.reply({embeds: [embed], ephemeral: true})
              } else {
                if(r_despido<p_despido){
                  usuarios.eliminar(`${interaction.member.id}.trabajo.${interaction.guild.id}`)
                  var embed = new Discord.MessageEmbed()
                    .setDescription('Esto nadie se lo esperaba...\nTe han despedido   :grimacing:')
                    .setColor(0xed4245)
                  await interaction.reply({embeds: [embed], ephemeral: true})
                } else {
                  if(r_invalidez<p_invalidez){
                    usuarios.establecer(`${interaction.member.id}.trabajo.${interaction.guild.id}`, "invalido")
                    var embed = new Discord.MessageEmbed()
                        .setDescription('¡OH NO!\nHas sufrido un grave accidente y ahora tu estado es: \`Inválid@\`\nA partir de ahora ganarás un sueldo del gobierno')
                        .setColor(0xed4245)
                    await interaction.reply({embeds: [embed], ephemeral: true})
                  } else {
                    if(r_accidente<p_accidente){
                      usuarios.establecer(`${interaction.member.id}.temporizadores.${interaction.guild.id}_baja`, `${Math.floor(Date.now()+(r_baja*86400000))}`)
                      var embed = new Discord.MessageEmbed()
                        .setDescription('¡OH NO!\nHas sufrido un accidente.\nTienes una baja de `'+r_baja+'` días')
                        .setColor(0xed4245)
                      await interaction.reply({embeds: [embed], ephemeral: true})
                    } else {
                      if(r_propina>30 && !propina==0){usuarios.sumar(`${interaction.member.id}.dinero.${interaction.guild.id}.cartera`, `${propina}`)}
                      usuarios.sumar(`${interaction.member.id}.dinero.${interaction.guild.id}.banco`, sueldo)
                      if(r_desastre<p_desastre){
                        usuarios.restar(`${interaction.member.id}.dinero.${interaction.guild.id}.banco`, r_p_desastre)
                      }
                      usuarios.establecer(`${interaction.member.id}.temporizadores.${interaction.guild.id}_trabajo`, Math.floor(Date.now()+86400000))
                      var embed = new Discord.MessageEmbed()
                        .setDescription(`**RESÚMEN DE TU DÍA EN EL TRABAJO**\nHoy has ganado \`${sueldo} ₪\`${(r_propina>30 && !propina==0)?`\nUn ${cliente} te ha dado \`${propina} ₪\` de propina.`:""}${(r_desastre<p_desastre)?`\nHoy has metido la pata y te han descontado del sueldo \`${r_p_desastre} ₪\``:""}`)
                        .setColor(0x5865f2)
                      await interaction.reply({embeds: [embed], ephemeral: true})
                    }
                  }
                }
              }
            } catch (e){
              require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply")
            }
          }
        }
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si", e, "reply")
    }
  }
}