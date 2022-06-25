const Discord = require("discord.js")
const megadb = require("megadb")
const servidores = new megadb.crearDB('servidores')

module.exports = {
  run: async (client, interaction) => {
    try {
      let perm = interaction.member.permissions.has('ADMINISTRATOR')||interaction.member.id==='643575943289634836'
      if(!perm){
        require("../../../modulos_error/start").interact(client, interaction, "42", "no",  "", "reply")
      } else {
        const act = interaction.options.getString('acción');
        const id = interaction.options.getString('id');

        // AÑADIR A LA LISTA
        if (act == "añadir") {
          try {
            if (isNaN(id)) { require("../../../modulos_error/start").interact(client, interaction, "22", "no",  "", "reply", "Las IDs sólo pueden contener números") } 
            else if (parseInt(id)<10000000000000000) { require("../../../modulos_error/start").interact(client, interaction, "24", "no",  "", "reply", "Esta ID no existe") }
            else if (parseInt(id)>1000000000000000000) { require("../../../modulos_error/start").interact(client, interaction, "23", "no",  "", "reply", "Esta ID no existe") }
            else {
              if (servidores.has(`${interaction.guild.id}.whitelist.${id}`)) {
                var embed = new Discord.MessageEmbed()
                  .setDescription("Este usuario ya se encontraba en la lista blanca")
                  .setColor(0xed4245)
                await interaction.reply({embeds: [embed], ephemeral: true})
              } else {
                var embed = new Discord.MessageEmbed()
                  .setDescription(`El usuario con id \`${id}\` ha sido añadido a la lista blanca del servidor.\nA partir de ahora será tratad@ como usuario de prestigio.`)
                  .addField("Usuario:", `ID: ${id}`)
                  .setColor(0x5865f2)
                if (servidores.has(`${interaction.guild.id}.blacklist.${id}`)) {
                  servidores.eliminar(`${interaction.guild.id}.blacklist.${id}`)
                  embed = embed.setFooter("El usuario ha sido eliminado de la lista negra automáticamente")
                }
                servidores.establecer(`${interaction.guild.id}.whitelist.${id}`, {admin: interaction.member.id, time: Date.now()})
                try {
                  interaction.guild.bans.fetch().then(bans=> {
                    if(bans.size == 0) return
                    let bUser = bans.find(b => b.user.id == id)
                    if(!bUser) return
                    interaction.guild.members.unban(bUser.user)
                  })
                  var canal
                  if (servidores.has(`${interaction.guild.id}.verify.canal`)){
                    canal = await servidores.obtener(`${interaction.guild.id}.verify.canal`)
                  } else if (interaction.guild.rulesChannel){
                    canal = interaction.guild.rulesChannel.id
                  } else {
                    canal = interaction.channel.id
                  }
                  var invite = await client.channels.resolve(canal).createInvite({unique: true})
                  var embed4user = new Discord.MessageEmbed()
                    .setTitle("USUARIO DE PRESTIGIO")
                    .setDescription(`Un administrador/a te ha declarado como usuario de prestigio en el servidor "${interaction.guild.name}" con id \`${interaction.guild.id}\`.`)
                    .setColor(0x5865f2)
                  client.users.resolve(id).send({content: `${invite}`,embeds: [embed4user]}).catch((e)=>{return})
                } catch {}
                await interaction.reply({embeds: [embed], ephemeral: true})
              }
            }
          } catch (e) {
            require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
          }
        }
        
        // ELIMINAR DE LA LISTA
        if (act == "eliminar") {
          try {
            if (isNaN(id)) { require("../../../modulos_error/start").interact(client, interaction, "22", "no",  "", "reply", "Las IDs sólo pueden contener números") }
            else if (parseInt(id)<10000000000000000) { require("../../../modulos_error/start").interact(client, interaction, "24", "no",  "", "reply", "Esta ID no existe") }
            else if (parseInt(id)>1000000000000000000) { require("../../../modulos_error/start").interact(client, interaction, "23", "no",  "", "reply", "Esta ID no existe") }
            else {
              if (servidores.has(`${interaction.guild.id}.whitelist.${id}`)) {
                var embed = new Discord.MessageEmbed()
                  .setDescription(`El usuario con id \`${id}\` ha sido eliminado de la lista blanca del servidor.\nYa no será tratad@ como usuario de prestigio.`)
                  .addField("Usuario:", `ID: ${id}`).setColor(0x5865f2)
                servidores.eliminar(`${interaction.guild.id}.whitelist.${id}`)
                try {
                  var embed4user = new Discord.MessageEmbed()
                    .setTitle("USUARIO DESPRESTIGIADO")
                    .setDescription(`Se te ha retirado la condición de usuario de prestifgio en el servidor ${interaction.guild.name} con id \`${interaction.guild.id}\`.`)
                    .setColor(0x5865f2)
                  client.users.resolve(id).send({embeds: [embed4user]}).catch(()=>{return})
                } catch {}
                await interaction.reply({embeds: [embed], ephemeral: true})
              } else {
                var embed = new Discord.MessageEmbed()
                  .setDescription(`No hay ningún usuario con esta ID (\`${id}\`) en la lista blanca.`)
                  .setColor(0xed4245)
                await interaction.reply({embeds: [embed], ephemeral: true})
              }
            }
          } catch (e) {
            require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
          }
        }
        
        // COMPROBAR SU ESTADO EN LA LISTA
        if (act == "comprobar") {
          try {  
            if (isNaN(id)) { require("../../../modulos_error/start").interact(client, interaction, "22", "no",  "", "reply", "Las IDs sólo pueden contener números") } 
            else if (parseInt(id)<10000000000000000) { require("../../../modulos_error/start").interact(client, interaction, "24", "no",  "", "reply", "Esta ID no existe") }
            else if (parseInt(id)>1000000000000000000) { require("../../../modulos_error/start").interact(client, interaction, "23", "no",  "", "reply", "Esta ID no existe") }
            else {
              var embed = new Discord.MessageEmbed()
                .setDescription("Este usuario no se encuentra en la lista blanca")
                .setColor(0xfee75c)
              if (servidores.has(`${interaction.guild.id}.whitelist.${id}`)) {
                var admin = await servidores.obtener(`${interaction.guild.id}.whitelist.${id}.admin`)
                var tempo = await servidores.obtener(`${interaction.guild.id}.whitelist.${id}.time`)
                embed = new Discord.MessageEmbed()
                  .setColor(0x5865f2)
                  .addField("Estado", "En la lista blanca")
                  .addField("Administrador/a", `<@!${admin}>`)
                  .addField("Tiempo", `<t:${Math.floor(tempo/1000)}:D> (<t:${Math.floor(tempo/1000)}:R>)`)
              } else if (servidores.has(`${interaction.guild.id}.blacklist.${id}`)) {
                var admin = await servidores.obtener(`${interaction.guild.id}.blacklist.${id}.admin`)
                var tempo = await servidores.obtener(`${interaction.guild.id}.blacklist.${id}.time`)
                embed = new Discord.MessageEmbed()
                  .addField("Estado", "En la lista negra")
                  .addField("Administrador/a", `<@!${admin}>`)
                  .addField("Tiempo", `<t:${Math.floor(tempo/1000)}:D> (<t:${Math.floor(tempo/1000)}:R>)`)
                  .setColor(0xfee75c)
              }
              await interaction.reply({embeds: [embed], ephemeral: true})
            }
          } catch (e) { require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply") }
        }
      }
    } catch (e) {
      require("../../../modulos_error/start").interact(client, interaction, "01", "si",  e, "reply")
    }
  }
}